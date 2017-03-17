import Ember from 'ember';

export default Ember.Service.extend({
  setPost(post) {
    this.post = post;
  },
  getPost() {
    return this.post;
  }
});
