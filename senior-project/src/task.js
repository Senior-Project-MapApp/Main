import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

let description, endDate, startDate, loc, tasks, i;
function GetTaskModal({db, user}) {
    const getTask = () => {
        const reference = ref(db, 'users/' + user.uid + '/test'/* + title*/);
        onValue(reference, (snapshot) => {
            description = snapshot.val().desc;
            endDate = snapshot.val().endDate;
            startDate = snapshot.val().startDate;
            loc = snapshot.val().loc;
        }, {
            onlyOnce: true
        });
    }

    const getAllTasks = () => {
        const reference = ref(db, 'users/' + user.uid);
        onValue(reference, (snapshot) => {
            tasks = snapshot.val();
        }, {
            onlyOnce: true
        });
        for (i = 0; i < tasks.length; i++) {
            console.log('Title: ' + tasks[i]);
        }
    }
}

export default GetTaskModal;