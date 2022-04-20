module.exports = ({ db }) => {
    /* ---Get active users---*/
    db.users.addScope('activeUser', {
        where: {
            status: 1
        }
    });   
}