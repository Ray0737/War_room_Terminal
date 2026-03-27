const SB_URL = "https://pimmlgtqkkmghiamuvel.supabase.co";
const SB_KEY = "sb_publishable_4qoe8BeFfXctJs2qmCREyQ_sZDxkZZ0"; // Note: Use your actual anon key here
const supabaseClient = supabase.createClient(SB_URL, SB_KEY);
let currentEntryType = 'personnel';
let allCalendarEvents = [];
let allUsers = [];
let activeChatUserId = null;
let activeChatUserName = null;
let currentUserId = null;

window.sysAlert = function (msg, title = 'SYSTEM_NOTICE') {
    document.getElementById('sysAlertTitle').innerText = title;
    document.getElementById('sysAlertMessage').innerText = msg;
    new bootstrap.Modal(document.getElementById('sysAlertModal')).show();
};

window.sysConfirm = function (msg) {
    return new Promise((resolve) => {
        document.getElementById('sysConfirmMessage').innerText = msg;
        const modalEl = document.getElementById('sysConfirmModal');
        const modal = new bootstrap.Modal(modalEl);

        const proceedBtn = document.getElementById('sysConfirmProceed');
        const cancelBtn = document.getElementById('sysConfirmCancel');

        const newProceed = proceedBtn.cloneNode(true);
        proceedBtn.parentNode.replaceChild(newProceed, proceedBtn);

        const newCancel = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

        newProceed.addEventListener('click', () => {
            modal.hide();
            resolve(true);
        });

        newCancel.addEventListener('click', () => {
            modal.hide();
            resolve(false);
        });

        modalEl.addEventListener('hidden.bs.modal', function onHidden() {
            modalEl.removeEventListener('hidden.bs.modal', onHidden);
            resolve(false);
        });

        modal.show();
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) window.location.replace('index.html');

    // Live Clock (Year Month Date Hour Min)
    setInterval(() => {
        const now = new Date();
        document.getElementById('liveClock').innerText =
            `[ ${now.getFullYear()} ${String(now.getMonth() + 1).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ]`;

        const calDateHour = document.getElementById('calendarDateHour');
        if (calDateHour) {
            calDateHour.innerText = `CURRENT: ${String(now.getDate()).padStart(2, '0')} // ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} LOCAL`;
        }
    }, 1000);

    // Profile Display
    const { data: profile } = await supabaseClient.from('profiles').select('username').eq('id', session.user.id).single();
    if (profile && profile.username) {
        document.getElementById('callsignDisplay').innerText = profile.username.toUpperCase();
    } else if (session.user.email) {
        // Fallback to email prefix if no profile/username exists
        const emailPrefix = session.user.email.split('@')[0];
        document.getElementById('callsignDisplay').innerText = emailPrefix.toUpperCase();
    }

    currentUserId = session.user.id;

    renderCalendarGrid();
    loadDossiers();
    loadUserDirectory();
    setupChatListeners();
});

// UI TABS
function switchTab(id, el) {
    document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    el.classList.add('active');

    // Auto-scroll chat if entering chatting tab while active
    if (id === 'chatting' && activeChatUserId) {
        scrollToBottom();
    }
}

// CALENDAR LOGIC
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function setupCalendarSubscription() {
    supabaseClient
        .channel('public:events')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => {
            renderCalendarGrid(); // Refresh grid on any change (Insert/Update/Delete)
        })
        .subscribe();
}

async function renderCalendarGrid() {
    const grid = document.getElementById('calendarGrid');
    const { data: events } = await supabaseClient.from('events').select('*');
    allCalendarEvents = events || [];

    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    document.getElementById('calendarMonthYear').innerText = `${monthNames[currentMonth]} ${currentYear}`;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    let html = '';

    // empty blocks for prev month
    for (let i = 0; i < firstDayIndex; i++) {
        html += `<div class="calendar-day" style="background: rgba(0,0,0,0.2); border-color: transparent; cursor: default;" onclick="event.stopPropagation()"></div>`;
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const checkDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const dayTasks = allCalendarEvents.filter(e => e.event_date === checkDateStr);

        let tasksHtml = '';
        if (dayTasks.length > 0) {
            tasksHtml = `<div class="d-flex flex-column gap-1 mt-1" style="max-height: 70px; overflow-y: auto;">`;
            dayTasks.forEach(task => {
                tasksHtml += `
                    <div class="d-flex align-items-center px-1 py-0 text-white bg-danger border border-danger hover-red mb-1" 
                        style="background-color: rgba(217, 4, 41, 0.25) !important; font-size: 0.55rem; cursor: pointer; border-radius: 2px;" 
                        onclick="event.stopPropagation(); viewTask('${task.id}')">
                        
                        <div class="text-truncate flex-grow-1" title="${task.title}">
                            ${task.title.toUpperCase()}
                        </div>

                        <div class="ms-1 opacity-50 hover-white" 
                            style="font-size: 0.7rem; line-height: 1;" 
                            onclick="event.stopPropagation(); quickDeleteTask('${task.id}')">
                            &times;
                        </div>
                    </div>`;
            });
            tasksHtml += `</div>`;
        }

        const isToday = (currentYear === new Date().getFullYear() && currentMonth === new Date().getMonth() && i === new Date().getDate());

        html += `
            <div class="calendar-day ${isToday ? 'border-danger bg-danger bg-opacity-10' : ''}" 
                 onclick="prefillNewTask('${checkDateStr}')">
                <span class="day-num ${isToday ? 'text-danger' : ''}">${i}</span>
                ${tasksHtml}
            </div>`;
    }
    grid.innerHTML = html;
}

window.changeMonth = function (delta) {
    currentMonth += delta;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendarGrid();
};

window.prefillNewTask = function (dateStr) {
    clearEventModal();
    document.getElementById('evDate').value = dateStr;
    new bootstrap.Modal(document.getElementById('eventModal')).show();
};

function viewTask(id) {
    const task = allCalendarEvents.find(e => String(e.id) === String(id));
    if (!task) return;
    document.getElementById('modalTitle').innerText = (task.title || 'OBJECTIVE').toUpperCase();
    document.getElementById('modalDate').innerText = `DATE: ${task.event_date}`;
    document.getElementById('modalCategory').innerText = (task.category || 'UNCATEGORIZED').toUpperCase();
    document.getElementById('modalNotes').innerText = task.notes || 'NO_ADDITIONAL_NOTES';

    // Store the active task id for edit/delete
    document.getElementById('viewTaskModal').dataset.activeTaskId = id;

    new bootstrap.Modal(document.getElementById('viewTaskModal')).show();
}

document.getElementById('saveEvent').addEventListener('click', async () => {
    const title = document.getElementById('evTitle').value;
    const category = document.getElementById('evCategory').value;
    const date = document.getElementById('evDate').value;
    const notes = document.getElementById('evNotes').value;
    const { data: { user } } = await supabaseClient.auth.getUser();

    const eventModal = document.getElementById('eventModal');
    const editId = eventModal.dataset.editId;

    const entryData = {
        title,
        category,
        notes,
        event_date: date,
        user_id: user.id
    };

    let error;
    if (editId) {
        const { error: updateError } = await supabaseClient.from('events').update(entryData).eq('id', editId);
        error = updateError;
    } else {
        const { error: insertError } = await supabaseClient.from('events').insert([entryData]);
        error = insertError;
    }

    if (!error) {
        eventModal.dataset.editId = "";
        document.getElementById('evTitle').value = "";
        document.getElementById('evCategory').value = "";
        document.getElementById('evDate').value = "";
        document.getElementById('evNotes').value = "";
        location.reload();
    } else {
        sysAlert("FAILED TO SYNC EVENT: " + error.message, "SYNC_ERROR");
    }
});

// Edit Event Logic
document.getElementById('evEditBtn').addEventListener('click', () => {
    const taskId = document.getElementById('viewTaskModal').dataset.activeTaskId;
    const task = allCalendarEvents.find(e => String(e.id) === String(taskId));
    if (!task) return;

    // Prefill form
    document.getElementById('evTitle').value = task.title || '';
    document.getElementById('evCategory').value = task.category || '';
    document.getElementById('evDate').value = task.event_date || '';
    document.getElementById('evNotes').value = task.notes || '';

    // Set Edit ID
    document.getElementById('eventModal').dataset.editId = taskId;

    // Switch Modals
    bootstrap.Modal.getInstance(document.getElementById('viewTaskModal')).hide();
    new bootstrap.Modal(document.getElementById('eventModal')).show();
});

// Delete Event Logic
document.getElementById('evDelBtn').addEventListener('click', async () => {
    const taskId = document.getElementById('viewTaskModal').dataset.activeTaskId;
    if (!taskId) return;

    const verify = await sysConfirm("CONFIRM_DESTRUCTION: Permanent removal of task from timeline?");
    if (!verify) return;

    const { error } = await supabaseClient.from('events').delete().eq('id', taskId);

    if (error) {
        sysAlert("SYNC_FAILURE: Could not purge task.", "SYSTEM_ERROR");
    } else {
        bootstrap.Modal.getInstance(document.getElementById('viewTaskModal')).hide();
        location.reload();
    }
});

function clearEventModal() {
    document.getElementById('eventModal').dataset.editId = "";
    document.getElementById('evTitle').value = "";
    document.getElementById('evCategory').value = "";
    document.getElementById('evDate').value = "";
    document.getElementById('evNotes').value = "";
}

// --- DOSSIER LOGIC ---

// 1. Toggle between Personnel and Journal
function setEntryType(type) {
    currentEntryType = type;
    document.getElementById('typePers').classList.toggle('active', type === 'personnel');
    document.getElementById('typeJourn').classList.toggle('active', type === 'journal');
    document.getElementById('personnelFields').classList.toggle('d-none', type === 'journal');
    document.getElementById('journalFields').classList.toggle('d-none', type === 'personnel');
}

// 2. The Commit Function
document.getElementById('intelForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get current user session
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
        console.error("Auth Error:", authError);
        sysAlert("SESSION_EXPIRED: Please log in again.", "AUTH_ERROR");
        return;
    }

    // Map fields to Database Columns (Ensure these exist in your Supabase table)
    const entry = {
        owner_id: user.id,
        entry_type: currentEntryType,
        full_name: document.getElementById('fullName').value,
        callsign: document.getElementById('callsign').value,
        id_code: document.getElementById('idCode').value,
        dob: document.getElementById('dob').value,
        contact_info: document.getElementById('contact').value,
        coordinates: document.getElementById('address').value,
        summary: document.getElementById('comments').value,
        journal_title: currentEntryType === 'journal' ? document.getElementById('journalTitle').value : null
    };

    console.log("Committing Entry:", entry); // Debugging log

    const form = document.getElementById('intelForm');
    const editId = form.dataset.editId;

    let error;
    if (editId) {
        const { error: updateError } = await supabaseClient
            .from('dossiers')
            .update(entry)
            .eq('id', editId);
        error = updateError;
    } else {
        const { error: insertError } = await supabaseClient
            .from('dossiers')
            .insert([entry]);
        error = insertError;
    }

    if (error) {
        console.error("Commit Failed:", error.message);
        sysAlert("SYNC_ERROR: " + error.message, "DATABASE_ERROR");
    } else {
        console.log("Commit Successful");
        form.reset();
        delete form.dataset.editId;
        loadDossiers(); // Refresh list
    }
});

// 3. Load and Display Archived Entries
async function loadDossiers() {
    const { data: records, error } = await supabaseClient
        .from('dossiers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Fetch Error:", error.message);
        return;
    }

    const list = document.getElementById('dossierList');
    if (records) {
        list.innerHTML = records.map(r => `
            <div class="strat-card py-2 border-secondary mb-2" style="border-left: 2px solid ${r.entry_type === 'journal' ? '#888' : 'var(--red)'}">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="label-micro" style="font-size:0.5rem">${r.entry_type.toUpperCase()}</span>
                    <span class="opacity-25" style="font-size:0.5rem">${new Date(r.created_at).toLocaleDateString()}</span>
                </div>
                <div class="fw-bold small">
                    ${r.entry_type === 'personnel' ? (r.callsign || r.full_name || 'UNKNOWN_SUBJECT') : r.journal_title}
                </div>
                <div class="text-secondary mt-1" style="font-size:0.65rem">
                    ${r.summary ? r.summary.substring(0, 100) : 'No data recorded.'}
                </div>
            </div>
        `).join('');
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    window.location.replace('index.html');
});

// Variable to store the currently viewed ID for the purge function
let currentViewedId = null;

async function loadDossiers() {
    const { data: records, error } = await supabaseClient
        .from('dossiers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return console.error("Fetch Error:", error.message);

    const list = document.getElementById('dossierList');
    if (records) {
        list.innerHTML = records.map(r => {
            const isPers = r.entry_type === 'personnel';
            const primaryName = isPers
                ? (r.callsign || r.full_name || 'UNKNOWN').toUpperCase()
                : (r.journal_title || 'UNTITLED_LOG').toUpperCase();

            return `
                <div class="d-flex align-items-center py-2 px-1 border-bottom border-secondary dossier-row" 
                     style="--bs-border-opacity: .1; transition: 0.2s; cursor: pointer;"
                     onclick="openIntelDetail('${r.id}')">
                    
                    <div style="width: 4px; height: 12px; background: ${isPers ? 'var(--red)' : '#555'}; margin-right: 15px;"></div>
                    
                    <div class="flex-grow-1">
                        <div class="d-flex align-items-baseline">
                            <span class="fw-bold text-white me-2" style="font-size: 0.8rem; letter-spacing: 1px;">${primaryName}</span>
                            <span class="label-micro opacity-40" style="font-size: 0.5rem;">${isPers ? (r.id_code || 'N/A') : 'OP_LOG'}</span>
                        </div>
                    </div>

                    <div class="text-end d-flex align-items-center">
                        <span class="opacity-25 me-3" style="font-size: 0.55rem; font-family: monospace;">
                            ${new Date(r.created_at).toLocaleDateString('en-GB')}
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    }
}
async function openIntelDetail(id) {
    const { data: r, error } = await supabaseClient
        .from('dossiers')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !r) {
        console.error("ACCESS_DENIED: Record not found");
        return;
    }

    currentViewedId = id;

    if (r.entry_type === 'personnel') {
        // --- PERSONNEL UI MAPPING ---
        // Header
        document.getElementById('detCallsign').innerText = (r.callsign || 'VOID').toUpperCase();

        // Enlarged Name Header
        const nameDisplay = document.getElementById('detFullName');
        nameDisplay.innerText = (r.full_name || 'UNKNOWN_SUBJECT').toUpperCase();
        nameDisplay.style.fontSize = "0.9rem"; // Force enlargement for clarity
        nameDisplay.classList.add('opacity-75', 'text-white');

        // Metadata Grid
        document.getElementById('detIdCode').innerText = r.id_code || '---';
        document.getElementById('detDob').innerText = r.dob || '---';
        document.getElementById('detContact').innerText = r.contact_info || '---';
        document.getElementById('detAddress').innerText = r.coordinates || '---';

        // Tactical Notes (Personnel specific ID)
        document.getElementById('detSummary').innerText = r.summary || 'NO_INTEL_ON_RECORD';

        // Timestamp Formatting
        const ts = new Date(r.created_at);
        document.getElementById('detTimestamp').innerText =
            `${ts.toLocaleDateString('en-GB')} // ${ts.getHours()}:${String(ts.getMinutes()).padStart(2, '0')}`;

        // Initialize and show Personnel Modal
        const pModal = new bootstrap.Modal(document.getElementById('personnelDetailModal'));
        pModal.show();

    } else if (r.entry_type === 'journal') {
        // --- JOURNAL UI MAPPING (Uses jou prefixed IDs) ---
        document.getElementById('jouTitle').innerText = (r.journal_title || 'UNTITLED_LOG').toUpperCase();
        document.getElementById('jouTimestamp').innerText = new Date(r.created_at).toLocaleString();
        document.getElementById('jouSummary').innerText = r.summary || 'EMPTY_LOG_ENTRY';

        // Initialize and show Journal Modal
        const jModal = new bootstrap.Modal(document.getElementById('journalDetailModal'));
        jModal.show();
    }
}

// Delete Handlers for Modals
async function executePurge(modalId) {
    if (!currentViewedId) return;

    const verify = await sysConfirm("CONFIRM_DESTRUCTION: Permanent removal from STRATCOM core?");
    if (!verify) return;

    const { error } = await supabaseClient
        .from('dossiers')
        .delete()
        .eq('id', currentViewedId);

    if (error) {
        sysAlert("SYNC_FAILURE: Could not purge record.", "SYSTEM_ERROR");
    } else {
        const modalEl = document.getElementById(modalId);
        bootstrap.Modal.getInstance(modalEl).hide();
        loadDossiers();
    }
}

document.getElementById('detDelBtn').addEventListener('click', () => executePurge('personnelDetailModal'));
document.getElementById('jouDelBtn').addEventListener('click', () => executePurge('journalDetailModal'));

// SHA-256 Hash for 'Alpha-737'
const FAILSAFE_HASH = "8e97475f49e0c7a5f6e8c7c938f3708e2f6932462e0883f8f176793f7c46c87d";

// Tab Switching Logic
function switchDossierSubTab(target, btn) {
    const form = document.getElementById('intelForm');
    const maint = document.getElementById('maintenancePane');

    if (target === 'adder') {
        form.classList.remove('d-none');
        maint.classList.add('d-none');
    } else {
        form.classList.add('d-none');
        maint.classList.remove('d-none');
    }

    // Update Pill Styles
    btn.closest('.nav').querySelectorAll('.type-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
}

// Hashing Function
async function hashValue(value) {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Purge Execution
document.getElementById('confirmPurgeBtn').addEventListener('click', async () => {
    const input = document.getElementById('failsafeInput').value;
    const inputHash = await hashValue(input);

    if (inputHash === FAILSAFE_HASH) {
        const { data: { user } } = await supabaseClient.auth.getUser();

        const { error } = await supabaseClient
            .from('dossiers')
            .delete()
            .eq('owner_id', user.id);

        if (!error) {
            // Close modal and cleanup
            bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
            document.getElementById('failsafeInput').value = '';
            sysAlert("CORE_PURGE_SUCCESSFUL", "OPERATION_COMPLETE");
            loadDossiers();
            switchDossierSubTab('adder', document.querySelector('#dossierActionTabs .type-pill'));
        }
    } else {
        sysAlert("ACCESS_DENIED: INVALID_KEY", "SECURITY_ALERT");
        document.getElementById('failsafeInput').value = '';
    }
});


// Edit Function: Loads data back into the adder form
async function initiateEdit(recordId, modalId) {
    // 1. Fetch record
    const { data, error } = await supabaseClient.from('dossiers').select('*').eq('id', recordId).single();

    if (data) {
        // Switch Entry Type
        setEntryType(data.entry_type);

        // 2. Populate form fields
        if (data.entry_type === 'personnel') {
            document.getElementById('callsign').value = data.callsign || '';
            document.getElementById('fullName').value = data.full_name || '';
            document.getElementById('idCode').value = data.id_code || '';
            document.getElementById('dob').value = data.dob || '';
            document.getElementById('contact').value = data.contact_info || '';
            document.getElementById('address').value = data.coordinates || '';
        } else {
            document.getElementById('journalTitle').value = data.journal_title || '';
        }
        document.getElementById('comments').value = data.summary || '';

        // 3. Close the modal
        const modalEl = document.getElementById(modalId);
        bootstrap.Modal.getInstance(modalEl).hide();

        // 4. Switch to Entry Input tab
        const adderTabBtn = document.querySelector('#dossierActionTabs .type-pill:first-child');
        if (adderTabBtn) switchDossierSubTab('adder', adderTabBtn);
        window.scrollTo(0, 0);

        // 5. Store the ID in a dataset property so the submit handler knows to "Update"
        document.getElementById('intelForm').dataset.editId = recordId;
    }
}

document.getElementById('detEditBtn').addEventListener('click', () => initiateEdit(currentViewedId, 'personnelDetailModal'));
document.getElementById('jouEditBtn').addEventListener('click', () => initiateEdit(currentViewedId, 'journalDetailModal'));

// --- EAM CHAT SYSTEM ---

async function loadUserDirectory() {
    const { data: users, error } = await supabaseClient.from('profiles').select('id, username');
    if (error) return console.error('Error loading users:', error);

    // Filter out current user from the directory
    allUsers = users.filter(u => u.id !== currentUserId);
    renderUserList(allUsers);
}

function renderUserList(users) {
    const list = document.getElementById('userList');
    if (!users.length) {
        list.innerHTML = `<div class="text-secondary small text-center mt-3">NO_UNITS_FOUND</div>`;
        return;
    }

    list.innerHTML = users.map(u => `
        <div class="d-flex align-items-center justify-content-between p-2 border border-secondary border-opacity-25" 
             style="cursor: pointer; transition: 0.2s;" 
             onclick="openChat('${u.id}', '${u.username || 'UNKNOWN_UNIT'}')"
             onmouseover="this.style.background='rgba(255,255,255,0.05)'"
             onmouseout="this.style.background='transparent'">
            <div class="d-flex align-items-center gap-2">
                <div style="width: 8px; height: 8px; background: var(--red); border-radius: 50%;"></div>
                <span class="text-white fw-bold" style="font-size: 0.75rem;">${(u.username || 'UNKNOWN_UNIT').toUpperCase()}</span>
            </div>
            <span class="label-micro text-secondary" style="font-size: 0.5rem;" id="badge_${u.id}"></span>
        </div>
    `).join('');
}

document.getElementById('searchUser').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allUsers.filter(u => (u.username || '').toLowerCase().includes(term));
    renderUserList(filtered);
});

async function openChat(userId, username) {
    activeChatUserId = userId;
    activeChatUserName = username;

    // UI Transitions
    document.getElementById('chatDirectory').classList.remove('col-md-12');
    document.getElementById('chatDirectory').classList.add('col-md-4');
    document.getElementById('activeChatPane').classList.remove('d-none');

    // Setup Header
    document.getElementById('chatTargetName').innerText = username.toUpperCase();

    // Clear Badge if there was one
    const badge = document.getElementById(`badge_${userId}`);
    if (badge) badge.innerText = '';

    // Clear global badge if no more unread (simplified UX)
    document.getElementById('globalNotifBadge').classList.add('d-none');

    await fetchMessages();
}

document.getElementById('closeChatBtn').addEventListener('click', () => {
    activeChatUserId = null;
    activeChatUserName = null;
    document.getElementById('activeChatPane').classList.add('d-none');
    document.getElementById('chatDirectory').classList.remove('col-md-4');
    document.getElementById('chatDirectory').classList.add('col-md-12');
});

async function fetchMessages() {
    if (!activeChatUserId) return;

    // Fetching bidirectional messages
    const { data, error } = await supabaseClient
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${activeChatUserId}),and(sender_id.eq.${activeChatUserId},receiver_id.eq.${currentUserId})`)
        .order('created_at', { ascending: true });

    if (error) return console.error('SIGNAL_DEGRADATION:', error);
    renderMessages(data);
}

function renderMessages(messages) {
    const feed = document.getElementById('messageFeed');
    feed.innerHTML = messages.map((m, index) => {
        const isSent = m.sender_id === currentUserId;
        const time = new Date(m.created_at).toLocaleTimeString([], { hour12: false });
        const timerId = `timer_${index}`;

        return `
            <div class="mb-3 d-flex flex-column ${isSent ? 'align-items-end' : 'align-items-start'}">
                <span class="label-micro mb-1 opacity-50" style="font-size: 0.5rem;">
                    ${isSent ? 'ORIGIN: SELF' : 'ORIGIN: ' + activeChatUserName.toUpperCase()} // ${time}
                </span>
                <div class="p-2 border ${isSent ? 'border-danger bg-danger bg-opacity-10' : 'border-secondary bg-white bg-opacity-5'}" style="max-width: 85%; font-size: 0.75rem;">
                    <div class="fw-bold mb-1" style="letter-spacing: 2px;">${m.content}</div>
                    <div class="d-flex justify-content-between gap-4 opacity-50" style="font-size: 0.55rem;">
                        <span>VALIDITY_CODE: ${m.id.substring(0, 8).toUpperCase()}</span>
                        <span id="${timerId}">05:00</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Start countdowns for the last few messages
    messages.forEach((m, index) => {
        startEAMCountdown(`timer_${index}`, 300); // 5-minute validity
    });

    feed.scrollTop = feed.scrollHeight;
}

function scrollToBottom() {
    const feed = document.getElementById('messageFeed');
    feed.scrollTop = feed.scrollHeight;
}

document.getElementById('eamForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('eamInput');
    const content = input.value.trim();
    if (!content || !activeChatUserId) return;

    input.value = ''; // clear immediately for UX

    const newMsg = {
        sender_id: currentUserId,
        receiver_id: activeChatUserId,
        content: content
    };

    const { error } = await supabaseClient.from('messages').insert([newMsg]);
    if (error) {
        sysAlert("COMM_FAILURE: Signal lost.", "TRANSMISSION_ERROR");
    }
});

function setupChatListeners() {
    supabaseClient
        .channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
            const msg = payload.new;

            // If message is for THIS chat currently open
            if (
                (msg.sender_id === currentUserId && msg.receiver_id === activeChatUserId) ||
                (msg.sender_id === activeChatUserId && msg.receiver_id === currentUserId)
            ) {
                fetchMessages(); // refresh view
            }
            // If message is sent TO current user but chat is NOT open
            else if (msg.receiver_id === currentUserId && msg.sender_id !== activeChatUserId) {
                const badge = document.getElementById(`badge_${msg.sender_id}`);
                if (badge) badge.innerText = '[ NEW ]';

                // Show global nav badge if on a different tab
                const chatTab = document.querySelector('a[onclick="switchTab(\'chatting\', this)"]');
                if (!chatTab.classList.contains('active')) {
                    document.getElementById('globalNotifBadge').classList.remove('d-none');
                }
            }
        })
        .subscribe();
}

// --- EAM CORE LOGIC ---

/**
 * Fetches all authorized profiles from the database
 * Filters out the current user to prevent self-messaging
 */
// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return window.location.replace('index.html');

    currentUserId = session.user.id;

    // Load assets
    loadUserDirectory();
    setupChatListeners();
});

// --- UNIT DIRECTORY ---
async function loadUserDirectory() {
    const { data: users, error } = await supabaseClient.from('profiles').select('id, username');

    if (error) {
        console.error('SEC_FAILURE: Directory unavailable.', error);
        return;
    }

    // Filter out self and render
    allUsers = (users || []).filter(u => u.id !== currentUserId);
    renderUserList(allUsers);
}

function renderUserList(users) {
    const list = document.getElementById('userList');
    if (!users.length) {
        list.innerHTML = `<div class="text-secondary small text-center mt-3">NO_UNITS_FOUND</div>`;
        return;
    }

    list.innerHTML = users.map(u => `
        <div class="p-2 border border-secondary border-opacity-25" style="cursor: pointer;" onclick="openChat('${u.id}', '${u.username}')">
            <div class="d-flex align-items-center gap-2">
                <div style="width: 8px; height: 8px; background: var(--red); border-radius: 50%;"></div>
                <span class="text-white fw-bold" style="font-size: 0.75rem;">${(u.username || 'UNKNOWN').toUpperCase()}</span>
            </div>
        </div>
    `).join('');
}

// --- EAM TERMINAL ---
async function openChat(userId, username) {
    activeChatUserId = userId;
    activeChatUserName = username;

    document.getElementById('chatDirectory').classList.replace('col-md-12', 'col-md-4');
    document.getElementById('activeChatPane').classList.remove('d-none');
    document.getElementById('chatTargetName').innerText = username.toUpperCase();

    fetchMessages();
}

document.getElementById('eamForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('eamInput');
    const content = input.value.trim().toUpperCase();

    if (!content || !activeChatUserId) return;

    // The data object keys MUST match your SQL column names
    const newMsg = {
        sender_id: currentUserId,
        receiver_id: activeChatUserId,
        content: content
    };

    const { error } = await supabaseClient.from('messages').insert([newMsg]);

    if (error) {
        sysAlert("COMM_FAILURE: " + error.message, "SYNC_ERROR");
    } else {
        input.value = '';
        fetchMessages();
    }
});

// Add this inside your existing script or where you initialize listeners
// Function to handle the Purge
async function purgeCurrentChat() {
    if (!activeChatUserId || !currentUserId) {
        console.error("USER_ID_MISSING");
        return;
    }

    const confirmed = await window.sysConfirm("CRITICAL: ERASE ALL PERMANENT LOGS IN DATABASE?");
    if (!confirmed) return;

    // Direct deletion of all messages where these two users are involved
    const { data, error } = await supabaseClient
        .from('messages')
        .delete()
        .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${activeChatUserId}),and(sender_id.eq.${activeChatUserId},receiver_id.eq.${currentUserId})`);

    if (error) {
        console.error("DATABASE_REJECTION:", error.message);
        window.sysAlert("ERROR: DATABASE_RLS_REJECTION", "SECURITY_DENIED");
    } else {
        // Force clear the UI
        document.getElementById('messageFeed').innerHTML = '';
        window.sysAlert("DATABASE_CLEARED_PERMANENTLY", "SUCCESS");
        // Optional: Refresh the directory to update last message snippets if you have them
        fetchMessages();
    }
}
// IMPORTANT: Hook the button to the function
// Put this inside your script where you initialize other buttons
document.getElementById('purgeChatBtn').onclick = purgeCurrentChat;

// Update fetchMessages to ensure the Source labels remain minimal
async function fetchMessages() {
    if (!activeChatUserId) return;
    const { data, error } = await supabaseClient
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${activeChatUserId}),and(sender_id.eq.${activeChatUserId},receiver_id.eq.${currentUserId})`)
        .order('created_at', { ascending: true });

    if (error) return;

    const feed = document.getElementById('messageFeed');
    feed.innerHTML = data.map(m => {
        const isSent = m.sender_id === currentUserId;
        return `
            <div class="d-flex flex-column ${isSent ? 'align-items-end' : 'align-items-start'} mb-3">
                <div style="max-width: 85%; border-bottom: 1px solid ${isSent ? 'rgba(217, 4, 41, 0.3)' : 'rgba(255,255,255,0.1)'}; padding-bottom: 4px;">
                    <div class="label-micro ${isSent ? 'text-danger' : 'text-secondary'}" style="font-size: 0.5rem; margin-bottom: 2px;">
                        ${isSent ? 'You' : activeChatUserName.toUpperCase()}
                    </div>
                    <div class="text-white" style="font-size: 0.7rem; line-height: 1.2; text-align: ${isSent ? 'right' : 'left'};">
                        ${m.content}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    feed.scrollTop = feed.scrollHeight;
}

function setupChatListeners() {
    supabaseClient
        .channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
            if (payload.new.sender_id === activeChatUserId || payload.new.receiver_id === activeChatUserId) {
                fetchMessages();
            }
        }).subscribe();
}

async function loadUserDirectory() {
    // 1. Ensure we have the current user's ID
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return;
    currentUserId = session.user.id;

    // 2. Fetch from the table we just created
    const { data: users, error } = await supabaseClient
        .from('profiles')
        .select('id, username');

    if (error) {
        console.error("DIRECTORY_ERROR:", error.message);
        return;
    }

    // 3. Filter out yourself and render
    // If username is null, we show the first part of their ID as a callsign
    allUsers = users.filter(u => u.id !== currentUserId);

    const list = document.getElementById('userList');
    list.innerHTML = allUsers.map(u => `
        <div class="p-2 border border-secondary border-opacity-25 mb-2" 
             style="cursor: pointer;" 
             onclick="openChat('${u.id}', '${u.username || 'UNIT_' + u.id.substring(0, 4)}')">
            <span class="text-white small fw-bold">
                > ${(u.username || 'UNIT_' + u.id.substring(0, 4)).toUpperCase()}
            </span>
        </div>
    `).join('');
}

window.quickDeleteTask = async function (taskId) {
    const verify = await sysConfirm("CONFIRM_DESTRUCTION: Permanent removal of task from timeline?");
    if (!verify) return;

    const { error } = await supabaseClient
        .from('events')
        .delete()
        .eq('id', taskId);

    if (error) {
        sysAlert("SYNC_FAILURE: Could not purge task.", "SYSTEM_ERROR");
    } else {
        // Refresh the grid to reflect the change
        renderCalendarGrid();
    }
};

