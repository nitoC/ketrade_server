import { getAllNotification } from "../../services/notification"


const notification = async (req, res) => {

    try {
        const notifications = await getAllNotification()
        return res.status(200).json({ status: 'success', payload: notifications })
    } catch (err) {
        res.status(500).json({ message: "sorry not able to fetch notfications" })
    }

}

export default notification