import notificationRepository from "../../models/notification.js";


const getAllNotification = async () => {

    try {
        const notification = await notificationRepository.find()
        return notification;
    } catch (err) {
        console.log("error", err)
        return { err }
    }


}

const getAllNotificationById = async (id) => {

    try {
        const notification = await notificationRepository.findById(id)
        return notification;
    } catch (err) {
        console.log("error", err)
        return { err }
    }


}
const createNotification = async (data) => {

    try {
        const notification = await new notificationRepository(data).save()
        return notification;
    } catch (err) {
        console.log("error", err)
        return { err }
    }


}

export {
    getAllNotification,
    getAllNotificationById,
    createNotification
}