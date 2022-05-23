const userSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
});

const User = db.model('user', userSchema);
const user = new User();
let error;

user.phone = '555.0123';
error = user.validateSync();
assert.equal(error.errors['phone'].message,
  '555.0123 is not a valid phone number!');

user.phone = '';
error = user.validateSync();
assert.equal(error.errors['phone'].message,
  'User phone number required');

user.phone = '201-555-0123';
// Validation succeeds! Phone number is defined
// and fits `DDD-DDD-DDDD`
error = user.validateSync();
assert.equal(error, null);



// It starts with http:// or https://.
// www. is an optional group.
// The path is a sequence containing letters, numbers, or any of the following characters: ._~:/?%#[]@!$&'()*+,;= written following a / after the URL or DNS zone. There may be a hash # at the end of the path.
// The template is able to find URLs in the following formats:
// http://example.com/
// https://www.example.com/
// http://1-example.com
// http://example.com/go/even/deeper/
// http://example-example-example.com