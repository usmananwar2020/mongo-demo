const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CRUD_app')
.then(()=> console.log("connected ..."))
.catch((err) => console.log('err ==',err ));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

// *******************Create the course*******************
const createCourse = async () => {
    const course = new Course({
        name: "mongoose",
        author: "Muhammad imran",
        tags: ['react', 'frontend'],
        isPublished: true
    })
    
    const response = await course.save();
    console.log(response)
}
// createCourse();


// *******************Get the Course*******************
const getCourse = async () => {

    // const pageNumber = 2;
    // const pageSize = 10;

    const course = await Course
    .find({isPublished: true})
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .limit(2)
    .sort({name: 1})
    .select({name: 1, author: 1})
    //.count() -> count is use for return the number of total records in the table
    console.log("courses ==", course);
}
// getCourse();

// Here is some comparison operators
//eq (equal)
//ne (not equal)
//gt (grathe than)
//ngt (not grather than)
//lt (less than)
//nlt (not less than)
//in (in operator -> It accept the values in array)
//nin (not in)
// find({price: {$gte: 15}}) => This query will return the value where the price will be between 10 to 20.
// find({price: $in[10, 15, 20]}) => This query will retuen the value which is exactly 10,15,20

// Here is some logical operator
// or
//and
//  find().or([ {author: 'Muhammad Usman'}, {isPublished: true}])

// Here is code for pagination
// .find.skip((pageNumber - 1) * pageSize).limit(pageSize)



//*******************Update the course*******************
const updateCourse = async (id) => {
    const result = await Course.findByIdAndUpdate(
        id,
        {   
            name: 'MySQL',
            isPublished: true
        },
        {
            new: true
        }
    )
    // const result = await Course.updateOne({_id:id},{
    //     $set:{
    //         name: 'MySQL'
    //     }
    // })
    console.log(result);
}
// updateCourse('677255de3e752da7c29dba0d')

//*******************Delete the course*******************
const deleteCourse = async (id) => {
    const result = await Course.deleteOne({_id:id})
    console.log(result);
}
deleteCourse('6774ee143f36b21b6264168f')