(function() {
    console.log("");
    console.log("#");
    console.log("# indexedDB");
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    var dbName = "edubook_popup_se_4-1";
    var objectStore1Name = "drawing";
    var objectStore2Name = "annotation_input";
    var dbVersion = 2;
    var requestDB;
    var db;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    checkData_indexed_db = function(objectStoreName, key, data) {
        console.log("");
        console.log("-> checkData_indexed_db");
        console.log("-> key = " + key);
        console.log("-> data");
        console.log(data);
        if (data.value.length < 1) {
            console.log("-> indexed_db ������ ���� ���� ����.");
            return;
        }
        var objectStore = db.transaction([ objectStoreName ], "readwrite").objectStore(objectStoreName);
        objectStore.put(data);
    };
    addData_indexed_db = function(objectStoreName, key, data) {
        console.log("");
        console.log("-> addData_indexed_db");
        console.log("-> " + objectStoreName + " / " + key);
        if (data.value.length < 1) {
            console.log("-> indexed_db ������ ���� ���� ����.");
            return;
        }
        var transaction = db.transaction([ objectStoreName ], "readwrite");
        transaction.objectStore(objectStoreName).add(data);
        transaction.onsuccess = function(event) {
            console.log("-> Success addData_indexed_db");
            console.log(event);
            var key = event.target.result;
            console.log("-> success! key -> " + key);
        };
        transaction.onerror = function(event) {
            console.log("-> Error : addData_indexed_db");
            console.log(event);
        };
    };
    getData_indexed_db = function(objectStoreName, key, callback) {
        console.log("");
        console.log("-> getData_indexed_db");
        console.log("-> " + objectStoreName + " / " + key);
        try {
            var transaction = db.transaction([ objectStoreName ], "readwrite");
            var requestKey = transaction.objectStore(objectStoreName).get(key);
            requestKey.onsuccess = function(e) {
                var data = e.target.result;
                console.log("-> Success getData_indexed_db");
                callback(data);
            };
        } catch (e) {
            console.log(e);
        }
    };
	getDataAll_indexed_db = function(objectStoreName, callback) {
        console.log("");
        console.log("-> getDataall_indexed_db");
        
        try {
            var transaction = db.transaction([ objectStoreName ], "readwrite");
            var requestKey = transaction.objectStore(objectStoreName).getAll();
            requestKey.onsuccess = function(e) {
                var data = e.target.result;
                console.log("-> Success getData_indexed_db");
                callback(data);
            };
        } catch (e) {
            console.log(e);
        }
    };
    deleteData_indexed_db = function(objectStoreName, key) {
        console.log("");
        console.log("-> deleteData_indexed_db");
        console.log("-> " + objectStoreName + " / " + key);
        try {
            var objectStore = db.transaction([ objectStoreName ], "readwrite").objectStore(objectStoreName);
            objectStore.delete(key).onsuccess = function(event) {
                console.log("-> Success deleteData_indexed_db");
            };
        } catch (e) {
            console.log(e);
        }
    };
    updateData_indexed_db = function(objectStoreName, key, data) {
        console.log("");
        console.log("-> updateData_indexed_db");
        console.log("-> " + objectStoreName + " / " + key);
        var transaction = db.transaction([ objectStoreName ], "readwrite");
        var objectStore = transaction.objectStore(objectStoreName);
        var requestKey = objectStore.get(key);
        requestKey.onsuccess = function(event) {
            console.log("-> Success updateData_indexed_db");
            console.log(data);
            console.log(requestKey);
            console.log(requestKey.result);
            console.log(requestKey.result.value);
        };
    };
    delete_indexed_db = function(tmp_dbName) {
        console.log("");
        console.log("-> delete_indexed_db");
        console.log("-> " + tmp_dbName);
        try {
            console.log(db);
            if (db) {
                db.close();
            }
            var dbDeleteRequest = window.indexedDB.deleteDatabase(tmp_dbName);
            dbDeleteRequest.onerror = function(e) {
                console.log("Error delete_indexed_db");
            };
            dbDeleteRequest.onsuccess = function(e) {
                console.log("-> Success delete_indexed_db");
                open_indexed_db(function(open_indexed_db_result) {
                    parent.indexedDBSupport = open_indexed_db_result;
                    console.log("-> indexedDBSupport = " + open_indexed_db_result);
                });
            };
            dbDeleteRequest.onblocked = function(e) {
                console.log("-> Couldn't delete database due to the operation being blocked");
                console.log(e);
            };
        } catch (e) {
            console.log(e);
        }
    };
    open_indexed_db = function(callback) {
        console.log("-> open_indexed_db");
        if (!window.indexedDB) {
            console.log("Your Browser does not support DB");
            parent.indexedDBSupport = false;
            if (typeof callback === "function") {
                callback(parent.indexedDBSupport);
            }
            return;
        } else {
            requestDB = window.indexedDB.open(dbName, dbVersion);
            requestDB.onerror = function(e) {
                console.log("-> indexedDB Open Error : " + e);
                parent.indexedDBSupport = false;
                if (typeof callback === "function") {
                    callback(parent.indexedDBSupport);
                }
            };
            requestDB.onupgradeneeded = function(e) {
                console.log("-> indexedDB Upgrading...");
                db = e.target.result;
                if (!db.objectStoreNames.contains(objectStore1Name)) {
                    var objectStore1 = db.createObjectStore(objectStore1Name, {
                        keyPath: "idx"
                    });
                }
                if (!db.objectStoreNames.contains(objectStore2Name)) {
                    var objectStore2 = db.createObjectStore(objectStore2Name, {
                        keyPath: "idx"
                    });
                }
                console.log(db);
                parent.indexedDBSupport = true;
                if (typeof callback === "function") {
                    callback(parent.indexedDBSupport);
                }
            };
            requestDB.onsuccess = function(e) {
                console.log("-> indexedDB Open Success 1");
                db = e.target.result;
                console.log(db);
                parent.indexedDBSupport = true;
                if (typeof callback === "function") {
                    callback(parent.indexedDBSupport);
                }
            };
        }
    };
    open_indexed_db(function(open_indexed_db_result) {
        parent.indexedDBSupport = open_indexed_db_result;
        console.log("-> indexedDBSupport = " + open_indexed_db_result);
    });
})();