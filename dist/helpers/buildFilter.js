"use strict";
const buildFilter = (query, role, userId) => {
    const filter = {};
    //searching by role
    if (role == "professional") {
        filter.professional = userId;
    }
    else {
        filter.clients = { $in: [userId] };
    }
    //creation of the meeting
    if (query.made_after || query.made_before) {
        filter.createdAt = {};
        if (query.made_after) {
            const d = new Date(query.made_after);
            if (!isNaN(d))
                filter.createdAt.$gte = d;
        }
        if (query.made_before) {
            const d = new Date(query.made_before);
            if (!isNaN(d))
                filter.createdAt.$lte = d;
        }
    }
    //when the meeting is going to happen
    if (query.date_max || query.date_min) {
        filter.date = {};
        if (query.date_max) {
            const d = new Date(query.date_max);
            if (!isNaN(d))
                filter.date.$lte = d;
        }
        if (query.date_min) {
            const d = new Date(query.date_min);
            if (!isNaN(d))
                filter.date.$gte = d;
        }
    }
    //if the meeting is already done
    if (query.done === "true") {
        filter.done = true;
    }
    else if (query.done === "false") {
        filter.done = false;
    }
    console.log(filter);
    return filter;
};
module.exports = buildFilter;
//# sourceMappingURL=buildFilter.js.map