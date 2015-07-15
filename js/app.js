//$(document).ready(function() {


  // This is out person model
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
    initialize: function() {
      this.render();
    },

    my_template: _.template('<strong><%= name %></strong> (<%= age %>) - <%= occupation %>'),

    render: function() {
      // remember that toJSON just passes the object parameters so this gets the right data
      this.$el.html( this.my_template( this.model.toJSON )));
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



















//}());