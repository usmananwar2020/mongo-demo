const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CRUD_app')
.then(()=> console.log("connected ..."))
.catch((err) => console.log('err ==',err.message ));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name,bio,website){
    const author = new Author({
        name,
        bio,
        website
    })
    const result = await author.save();
    console.log(result);
}
// createAuthor('Usman', 'Wah Cantt', 'usman.com');

async function createCourse(name, author){
    const course = new Course({
        name,
        author
    })
    const result = await course.save();
    console.log(result);
}
// createCourse('Frontend','677639b57127a3463bc2bd75')

async function getCoursesList(){
    const courses = await Course
    .find()
    .populate('author', '-name') // populate method is use for getting the data on the bases of given Id from another table. It tasks 2 arrguments. First is Document/table name and Second is colomun name. (if we use the '-' with column name, its mean this colomun will excluded). 
    .select({name:1,author: 1}); // select('name author')
    console.log(courses);
}
getCoursesList();