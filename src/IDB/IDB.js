// export 
const IDBRequest = indexedDB.open("User", 1)

IDBRequest.addEventListener("upgradeneeded", () => {
    const notesList = IDBRequest.result;

    notesList.createObjectStore("Notes", { autoIncrement: true });
});

export const createTransaction = async (mode) => {
    const notesList = await new Promise((resolve, reject) => {
        IDBRequest.addEventListener("success", (e) => resolve(e.target.result) )
    });
    const IDBtransaction = notesList.transaction("Notes", mode);
    const objectStore = IDBtransaction.objectStore("Notes");

    return objectStore;
}

export const addDataToIDB = (dataObject) => {
    const objectStore = createTransaction("readwrite").then(response => response.add(dataObject) );
}

export const readIDBData = async () => {
    const objectStore = await createTransaction("readonly").then(response => response);
    const cursor = objectStore.openCursor();

    const notes = await new Promise((resolve, reject) => {
        const notesArray = [];

        cursor.addEventListener("success", () => {
            if (cursor.result) {
                notesArray.push(cursor.result.value)

                cursor.result.continue();
            } else resolve(notesArray)
        })
    })

    return notes
}

export const modifyIDBData = (key, newDataObject) => {
    const objectStore = createTransaction("readwrite").then(response => response.put(newDataObject, key));
}

export const deleteIDBData = key => {
    const objectStore = createTransaction("readwrite").then(response => response.delete(key));
}