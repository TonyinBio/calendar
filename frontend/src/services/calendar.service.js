import http from "../http-common"

class CalendarDataService {
    // Demos
    createDemo(demo) {
        return http.post("/demos", demo)
    }

    getDemos(title) {
        return http.get(`/demos?title=${title}`)
    }

    getAvailableDemos(title) {
        return http.get(`/demos?title=${title}`)
    }

    updateDemo(id, changes) {
        return http.put(`/demos/${id}`, changes)
    }

    deleteDemo(id) {
        return http.delete(`/demos/${id}`)
    }

    deleteAllDemos() {
        return http.delete("/demos")
    }

    // Events
    createEvent(event) {
        return http.post("/events", event)
    }

    getEvents() {
        return http.get("/events")
    }

    getEvent(id) {
        return http.get(`/events/${id}`)
    }

    updateEvent(id, changes) {
        return http.put(`/events/${id}`, changes)
    }

    deleteEvent(id) {
        return http.delete(`/events/${id}`)
    }
}

export default new CalendarDataService()