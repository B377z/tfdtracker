const bcrypt = require('bcryptjs');

const testPassword = async () => {
  const plainPassword = 'password123';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  console.log('Plain password:', plainPassword);
  console.log('Hashed password:', hashedPassword);

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('Password match result:', isMatch);
};

testPassword();
