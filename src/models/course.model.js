import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const lectureSchema = new Schema({
    title: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['video', 'article', 'quiz', 'exercise'],
        required: true 
    },
    duration: { type: Number }, // in minutes
    contentUrl: { type: String }, // URL to video/article/quiz
    resources: [{ type: String }], // URLs to additional files
    isFreePreview: { type: Boolean, default: false }
}, { timestamps: true });

const sectionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    lectures: [lectureSchema],
    order: { type: Number, required: true }
}, { timestamps: true });

const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const courseSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    category: { 
        type: String, 
        enum: ['web-development', 'mobile-development', 'data-science', 
               'cyber-security', 'cloud-computing', 'programming-languages', 
               'game-development', 'other'],
        required: true 
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
        required: true
    },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    thumbnailUrl: { type: String, required: true },
    promoVideoUrl: { type: String },
    sections: [sectionSchema],
    resources: [{ type: String }],
    language: {
        type: String,
        enum: ['english', 'spanish', 'french', 'german', 'other'],
        default: 'english'
    },
    certificateAvailable: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['draft', 'published', 'private'],
        default: 'draft'
    },
    requirements: [{ type: String }],
    learningOutcomes: [{ type: String }],
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalStudents: { type: Number, default: 0 },
    totalLectures: { type: Number, default: 0 },
    totalHours: { type: Number, default: 0 }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Calculate average rating whenever a review is added
courseSchema.methods.updateAverageRating = function() {
    if (this.reviews.length === 0) {
        this.averageRating = 0;
        return;
    }
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = sum / this.reviews.length;
};

// Calculate total lectures and hours
courseSchema.pre('save', function(next) {
    this.totalLectures = this.sections.reduce(
        (total, section) => total + section.lectures.length, 0
    );
    
    this.totalHours = this.sections.reduce(
        (total, section) => total + section.lectures.reduce(
            (secTotal, lecture) => secTotal + (lecture.duration || 0), 0
        ), 0
    ) / 60; // Convert minutes to hours
    
    next();
});

const Course = model('Course', courseSchema);

export default Course;