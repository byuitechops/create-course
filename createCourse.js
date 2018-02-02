/*eslint-env node, es6*/
/*eslint no-console:0*/

/* Put dependencies here */
const request = require('request'),
    auth = require('../../auth.json');


/**************************************
 * creates a new course in canvas
 * saves canvasOU to the course object
 **************************************/
module.exports = (course, stepCallback) => {

    if (course.info.canvasOU != '') {
        course.newInfo('copyCourse', true);
        stepCallback(null, course);
        return;
    }

    var courseName = '',
        courseCode = '';

    /* Get Canvas course name from the fileName */
    if ((/\d{3}\w?/i).test(course.info.fileName)) {
        courseCode = course.info.fileName.match(/\d{3}\w?/i)[0];
        courseName = course.info.fileName.split(/\d{3}\w?/i)[0].trim();
    } else {
        courseName = course.info.fileName.split('.zip')[0];
        courseCode = course.info.fileName.split('.zip')[0];
    }

    request.post({
        url: 'https://byui.instructure.com/api/v1/accounts/19/courses',
        form: {
            'course[name]': courseName,
            'course[course_code]': courseCode,
            'course[license]': 'public_domain',
            'course[is_public_to_auth_users]': 'true'
        }
    }, function (err, response, body) {
        if (err) {
            course.fatalError(err);
            stepCallback(err, course);
            return;
        } else {
            body = JSON.parse(body);

            course.message(`New Canvas course created with id ${body.id}`);
            course.info.canvasOU = body.id;

            stepCallback(null, course);
        }
    }).auth(null, null, true, auth.token);
};