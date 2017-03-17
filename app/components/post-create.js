import Ember from 'ember';

export default Ember.Component.extend({

  modalFactory: Ember.inject.service(),
  session: Ember.inject.service(),

  didRender() {
    this._super(...arguments);
    const $el = this.$('#post-create');
    this.modal = this.get('modalFactory').create($el);

    this.get('modalFactory').on('open', () => {
      const post = this.get('session').getPost();
      this.set('post', post);
    })
  },

  actions: {
    cancel() {
      this.modal.close();
    },
    save() {
      console.log(`create ${this.get('post')}`);
      this.get('post').save()
        .then(() => {
          console.log('worked?', arguments);
          this.modal.close();
        })
    }
  }
});
