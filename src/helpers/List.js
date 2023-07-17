import { DeleteColumn, RenameColumn } from "api/List";

const HandleRenamingList = (board, listId, title) =>
    new Promise((resolve, reject) => {
        if (board && listId && title) {
            board.lists[listId][title] = title;
            console.log('rename title', {
                boardId: board.id,
                listId: listId,
                title: title,
            })
            RenameColumn({
                boardId: board.id,
                listId: listId,
                title: title,
            })
                .then(() => resolve(board))
                .catch((err) => reject(err));
        } else {
            reject("Missing parameters");
        }
    });

const HandleDeletingList = (board, listId) =>
    new Promise((resolve, reject) => {
        if (board && listId) {
            DeleteColumn({
                boardId: board.id,
                listId: listId,
            })
                .then(() => resolve(true))
                .catch((err) => reject(err));
        } else {
            reject("Missing parameters");
        }
    });

const ListHelpers = {
    HandleRenamingList: HandleRenamingList,
    HandleDeletingList: HandleDeletingList,
};

export default ListHelpers;
