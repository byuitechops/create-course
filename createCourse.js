/*eslint-env node, es6*/
/*eslint no-console:0*/

/* Put dependencies here */
const canvas = require('canvas-wrapper');


/**************************************
 * creates a new course in canvas
 * saves canvasOU to the course object
 **************************************/
module.exports = (course, stepCallback) => {

    const courseOptions = {
        'course[name]': course.info.courseName,
        'course[course_code]': course.info.courseCode,
        'course[license]': 'public_domain',
        'course[is_public_to_auth_users]': 'true'
    };

    canvas.post(`https://byui.instructure.com/api/v1/accounts/${course.settings.accountID}/courses`, courseOptions, (createErr, newCourse) => {
        if (createErr) {
            course.fatalError(createErr);
            stepCallback(createErr, course);
            return;
        }
        course.message(`New Canvas course created with id ${newCourse.id}`);
        course.info.canvasOU = newCourse.id;

        stepCallback(null, course);
    });
};