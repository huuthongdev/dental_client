export default class TimeUtils {
    static oneDay = 24 * 60 * 60 * 1000;

    static between(startTime, endTime, fullText = false) {
        // var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(startTime);
        var secondDate = new Date(endTime);
        let timeRemaining = parseInt((firstDate.getTime() - secondDate.getTime()) / 1000);
        timeRemaining = timeRemaining < 0 ? -timeRemaining : timeRemaining;

        if (timeRemaining >= 0) {
            const years = parseInt(timeRemaining / (86400 * 365));
            timeRemaining = (timeRemaining % (86400 * 365));

            const months = parseInt(timeRemaining / (86400 * 28));
            timeRemaining = (timeRemaining % (86400 * 28));

            const days = parseInt(timeRemaining / 86400);
            timeRemaining = (timeRemaining % 86400);

            const hours = parseInt(timeRemaining / 3600);
            timeRemaining = (timeRemaining % 3600);

            const minutes = parseInt(timeRemaining / 60);
            timeRemaining = (timeRemaining % 60);

            if (fullText) {
                if (days === 0 && hours > 0) return `${hours} giờ  ${minutes} phút`;
                if (years > 0) return `${years} năm ${months} tháng ${days} ngày`
                return `${days} ngày`;
            }

            if (days === 0 && hours > 0) return `${hours}h:${minutes}p`;
            if (years > 0) return `${years} năm ${months} tháng ${days} ngày`
            return `${days} ngày`;
        } else {
            return;
        }
    }
}