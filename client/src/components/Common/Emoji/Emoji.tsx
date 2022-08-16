import React, { useState } from 'react'
import Picker, { IEmojiData } from 'emoji-picker-react';
interface EmojiProps {

}

export const Emoji: React.FC<EmojiProps> = () => {
   const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);

   const onEmojiClick = (_: React.MouseEvent, emojiObject: IEmojiData) => {
     setChosenEmoji(emojiObject);
   };
   console.log(chosenEmoji)
   return (
     <div style={{
      position: 'relative'
     }}>
          <Picker  onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%', position: 'absolute', top: '-100%', left:' 0' }} />
     </div>
   );
}