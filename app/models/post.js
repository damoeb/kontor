import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  description: DS.attr('string'),
  tags: DS.attr(),
  rating: DS.attr(),
  createdAt: DS.attr()
});
