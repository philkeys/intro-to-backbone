//$(document).ready(function() {


  // This is our person model
  var Person = Backbone.Model.extend({
    defaults: {
      name: 'Guest',
      age: 23,
      occupation: 'Worker'
    },
    work: function() {
      return this.get('name') + ' is working.';
    },
    validate: function(attributes) {
      if ( attributes.age < 0 ) {
        return 'Age must be positive.';
      }
      if ( !attributes.name ) {
        return 'Every person must have a name.';
      }
    }
  });

  // var person = new Person({
    // name: 'Phil',
    // age: 27,
    // profession: 'Designer'
  // });

  // person.get('name'); => 'Phil'
  // person.set({ 'name' : 'Jean' });
  // person.get('name'); => 'Jean'
  // person.toJSON() => Object { name: 'Jean', age: 27, occupation: 'Designer' }

  // model.on('valid', function() {
  //   console.log('something is not valid');
  // });

  var PersonView = Backbone.View.extend({
    tagName: 'li',
    className: 'person',
    // will be automatically called when the view is initiated
    // We removed initialize so that we can call render() directly
    // and make use of the chaining method
    // initialize: function() {
    //   this.render();
    // },

    template: _.template($('#personTemplate').html()),

    render: function() {
      // remember that toJSON just passes the object parameters so this gets the right data
      this.$el.html( this.template( this.model.toJSON()));

      return this; // return this for chaining
    }
    // this will render out the output for the data of the model associated to this view
    //render: function() {
    //  this.$el.html( this.model.get('name') + ' (' + this.model.get('age') + ') - ' + this.model.get('occupation') );
    //}
  });

  // var person = new Person({
  //  name: 'Phil',
  //  age: 27,
  //  occupation: 'designer'
  // });

  // var personView = new PersonView({
  //   model: person
  // });
  // person.el => Will tell you the view
  // person.$el => Will tell you the jQuery wrapper version


  // With the template now in place (my_template)
  // var person = new Person;
  // var personView = new PersonView({ model: person });
  // $(document.body).html(personView.el);

  // What is happeneding on lines 72 to 75
  // A person model object is being created
  // A personView object is created
  // Model person has been passed to that personView object
  // So personView has access to person object
  // personView constructor will call render method
  // render method will call template via my_template and pass data to my_template
  // my_template will accept the parameters and assign proper values and return back to render

// This is our model collection maker
// Note that this doesn't create a new collection, one must create an instance
// var peopleCollection = new PeopleCollection;
var PeopleCollection = Backbone.Collection.extend({
  model: Person
});

// var person = new Person;
// var personView = new PersonView({ model: person });
// var peopleCollection = new PeopleCollection();
// peopleCollection.add(person);
// var person2 = new Person({name: "Mohit Jain", age: 25, occupation: "Software Developer"});
// var personView2 = new PersonView({ model: person2 });
// peopleCollection.add(person2);
// peopleCollection
// peopleCollection.toJSON(); // --> returns a list of data attributes


// So now we want to create a collection view of the many people we are going to create...
// Each collection will be a ul container, this works as the models will be li's

// We will need to loop over each person in a model collection, create a singular view
// and then put them into the collection view
// 1. We need to loop over each model (person object)
// 2. We should call render for each person object
// 3. We should then display the collection as a whole in the HTML
var PeopleView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    console.log(this.collection);
  },

  render: function() {
    //console.log('this inside the render', this);
    // Loop over all the person objects
    // REMEMBER!!!!! You must include the context 'this' in the for loop
    // otherwise 'this' will refer to the window
    this.collection.each(function(person) {
      //console.log('this inside the collection loop', this);
      // console.log('This is each person object', person);
      // Should call render for the person objects
      // The initialize in each person view will call the render for it
      var personView = new PersonView({ model: person });
      // console.log('These is each person view\'s html', personView.el);

      // We need 'this' to be the right context so that we an actually append
      // each new model view to the 'ul'. And to access the 'ul' as well as
      // each model's 'li' we MUST use 'el.'
      this.$el.append(personView.render().el);
    }, this);

    return this; // Always return 'this' from the render call so that you can chain!!
  }
});















//}());