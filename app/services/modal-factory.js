import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  session: Ember.inject.service(),

  create($element) {
    const self = this;
    $($element).modal();

    return {
      open() {
        // console.log('before open', self.get('session').getPost());
        $($element).modal('open');
        console.log('open');
        self.trigger('open');
      },
      close() {
        $($element).modal('close');
      }
    }
  }
});
