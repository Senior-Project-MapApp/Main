import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

const getTask = () => {
    const reference = ref(db, 'users/' + user.uid + '/' + title);
    onValue(reference, (snapshot) => {
        const description = snapshot.val().desc;
        const endDate = snapshot.val().endDate;
        const startDate = snapshot.val().startDate;
        const loc = snapshot.val().loc;
    }, {
        onlyOnce: true
    });
}