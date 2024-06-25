


import moment from 'moment';

function returnClassDate(startTime) {
    // Parse the start time to a moment object
    const class_datetime = moment(startTime);
    // Get the start of today and yesterday
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');

    let class_date;
    // Check if the class date is today
    if (class_datetime.isSame(today, 'd')) {
        class_date = 'Today';
    }
    // Check if the class date is yesterday
    else if (class_datetime.isSame(yesterday, 'd')) {
        class_date = 'Yesterday';
    }
    // Otherwise, format the date in a readable format
    else {
        class_date = class_datetime.format('MMMM Do, YYYY'); // or your preferred format
    }
    return class_date;
}

export default returnClassDate;
