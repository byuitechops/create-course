/*eslint-env node, es6*/
/*eslint no-console:0*/

/* Put dependencies here */
const canvas = require('canvas-wrapper');


/**************************************
 * creates a new course in canvas
 * saves canvasOU to the course object
 **************************************/
module.exports = (course, stepCallback) => {

    /* only run if there isn't an existing canvas OU */
    if (course.info.canvasOU != '' && course.info.canvasOU != undefined) {
        course.newInfo('copyCourse', true);
        stepCallback(null, course);
        return;
    }

    const courseOptions = {
        'course[name]': course.info.courseName,
        'course[course_code]': course.info.courseCode,
        'course[license]': 'public_domain',
        'course[is_public_to_auth_users]': 'true'
    };

    canvas.post(`https://${course.info.domain}.instructure.com/api/v1/accounts/19/courses`, courseOptions, (createErr, newCourse) => {
        if (createErr) {
            course.fatalError(createErr);
            stepCallback(createErr, course);
            return;
        }
        course.message(`New Canvas course created with id ${newCourse.id}`);
        course.newInfo('canvasOU', newCourse.id);

        stepCallback(null, course);
    });
};