const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CRUD_app')
.then(()=> console.log("connected ..."))
.catch((err) => console.log('err ==',err.message ));

const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 225,
        // lowercase: true,
        // uppercase: true,
        // trim: true
        // match: pattern
        // enum: ['mongooes', 'MySQL', 'DataBase'] //Enum is use for to give the list of options. Entered value should be exact same as come into the list of Enum.
    }, // Built-in mongoose validator
    author: String,
    //If we want atleast 1 tag. We have not built-in validation method. Because "required method" just check the Array even it is empty of have some values.
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return new Promise ((resolve) => {
                    setTimeout(()=>{
                        const result = v && v.length > 0;
                        resolve(result);
                    },1000)
            })// This is async validator, we can use this when we need to get the data from DataBase. There will be the validator function that return Promise.
                
            // return v && v.length > 0; //This is sync validator
            },
            message: 'A course should have at least one tag'
        } // This is custome validation method.
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {return this.isPublished; }, // The price will be required when the isPublished will be true.
        min: 10,
        max: 200,
        get: v => Math.round(v), // This method round the Number value when we get the float value from database.
        set: v => Math.round(v), // This method round the Number value when we set the float value into the database.
    }
})

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
    const course = new Course({
        name: "mongoose",
        author: "Muhammad imran",
        tags: ['frontend'],
        isPublished: false,
        price: 10.51
        
    })
    try{
        const response = await course.save();
        console.log("try ==",response)
    }
    catch(exaption){
        console.log('err ==',exaption.message )
    }
}
createCourse();