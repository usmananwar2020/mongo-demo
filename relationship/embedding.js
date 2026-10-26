const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CRUD_app')
.then(()=> console.log("connected ..."))
.catch((err) => console.log('err ==',err.message ));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
})

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: authorSchema
}));



async function createCourse(name, author){
    const course = new Course({
        name,
        author
    })
    const result = await course.save();
    console.log(result);
}
// createCourse('Backend',new Author({name: 'Usman'}) )


async function getCoursesList(){
    const courses = await Course
    .find({_id:'677646f529ab318e95007ac3'})
    .select({name:1,author: 1});
    console.log(courses);
}
getCoursesList();

async function updateCourse(courseId){
    const course = await Course.updateOne({_id: courseId},{
        $set:{
            'author.name': 'Omer'
        }
    })
    console.log("updated course ==", course);
}

// updateCourse('677646f529ab318e95007ac3');

async function removeCourse(courseId){
    const course = await Course.updateOne({_id: courseId},{
        $unset:{
            'author': ''
        }
    })
    console.log("updated course ==", course);
}

// removeCourse('677646f529ab318e95007ac3');