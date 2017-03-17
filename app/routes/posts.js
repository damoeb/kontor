import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service(),
  modalFactory: Ember.inject.service(),

  model() {
    return {
      posts: this.store.findAll('post')
    };
  },
  actions: {
    edit(post) {
      console.log('edit', post);
      this.get('session').setPost(post);

      const $el = $('#post-create');
      this.get('modalFactory').create($el).open();
    },
    remove(post) {
      console.log('remove', post);
      post.destroyRecord();
    }
  }
});
