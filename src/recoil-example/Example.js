import React from 'react';
import {
  RecoilRoot,
  // atom,
  // selector,
  // useRecoilState,
  // useRecoilValue,
} from 'recoil';

export default function Example() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

function CharacterCounter() {
  return (
    <p>Hello!</p>
  );
}
