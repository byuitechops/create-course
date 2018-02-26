# Create Course
### *Package Name*: create-course
### *Child Type*: shell
### *Platform*: all
### *Required*: Required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

This shell module creates a new course in Canvas so we have a place to import the D2L course. This module will not run if course.info.canvasOU is already set.

## How to Install

```
npm install create-course
```

## Run Requirements
This child module requires the following fields in the course.info object:
* `courseName`
* `courseCode`
* `domain`

## Options
| Option | Values | Description |
|--------|--------|-------------|
|Existing Canvas OU| number | Determines if a blank course should be created or if the import should use an existing canvas course |

## Outputs
A new property titled `canvasOU` is created on course.info.

## Process

Describe in steps how the module accomplishes its goals.

1. Check if canvasOU exists
2. Create a new course with a POST request
3. save OU of new course

## Log Categories
This module does not use course.log anywhere.

## Requirements
This shell module is required for the conversion tool to work. It is used to provide a blank course to place the Brightspace course.