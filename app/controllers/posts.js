import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  modalFactory: Ember.inject.service(),

  createEmptyPost() {
    return this.store.createRecord('post');
  },

  init() {
    this.get('session').setPost(this.createEmptyPost());
  },
  actions: {
    savePost(post) {
      return post.save();
    },
    openModal(existingPost) {
      let post = existingPost || this.createEmptyPost();

      const $el = $('#post-create');
      this.get('modalFactory').create($el).open();
    }
  }
});
