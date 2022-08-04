import moment from "moment";
export function formatDateTime(ISOString) {
    if (ISOString) {
        return moment(ISOString).format("MMM Do YYYY, h:mm a");
    }
    return "A long time ago, in a galaxy far far away";
}

export function getTimestampFromMongoId(mongoIdString) {
    return parseInt(mongoIdString.substring(0, 8), 16);
}
