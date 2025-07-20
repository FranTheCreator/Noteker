// export 
// const IDBRequest = indexedDB.open("User", 1)

// IDBRequest.addEventListener("upgradeneeded", () => {
//     const notesList = IDBRequest.result;

//     notesList.createObjectStore("Notes", { autoIncrement: true });
// });

let db;

export const initIDB = () => {
    return new Promise((resolve, reject) => {
        if (db) return resolve(db);

        const request = indexedDB.open("User", 1);

        request.onerror = () => reject(request.error);

        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        }

        request.onupgradeneeded = (e) => {
            const notesList = e.target.result;
            notesList.createObjectStore("Notes", { autoIncrement: true });
        }
    });
}

export const createTransaction = async (mode) => {
    const notesList = await initIDB();
    const IDBtransaction = notesList.transaction("Notes", mode);
    const objectStore = IDBtransaction.objectStore("Notes");

    return objectStore;
}

export const addDataToIDB = (dataObject) => {
    const objectStore = createTransaction("readwrite").then(response => response.add(dataObject) );
}

export const readIDBData = async () => {
    const objectStore = await createTransaction("readonly");
    const cursor = objectStore.openCursor();

    const notes = await new Promise((resolve, reject) => {
        const notesArray = [];

        cursor.addEventListener("success", () => {
            if (cursor.result) {
                const notesObject = cursor.result.value;
                notesObject.key = cursor.result.key;

                notesArray.push(notesObject)

                cursor.result.continue();
            } else resolve(notesArray)
        })
    })

    // console.log(notes)

    return notes
}

export const modifyIDBData = (key, newDataObject) => {
    const objectStore = createTransaction("readwrite").then(response => response.put(newDataObject, key));
}

export const deleteIDBData = key => {
    const objectStore = createTransaction("readwrite").then(response => response.delete(key));
}