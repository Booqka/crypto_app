import React from 'react';
import renderer from 'react-test-renderer';
import Main from '../src/screens/Main';

test('renders correctly', () => {
  const tree = renderer.create(<Main />).toJSON();
  expect(tree).toMatchSnapshot();
});
