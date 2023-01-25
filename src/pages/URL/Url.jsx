import { Button, HStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

export const Url = () => {
  const [text, setText] = useState({
    url: "",
    short: ""
  })

  const handleSave = () => {

  }
  return (
    <HStack>
      <Input
        placeholder="Actual Url"
        onChange={(e) => setText.url(e.target.value)}
        value={text.url}
      />
      <Input
        placeholder="Shorted Url"
        onChange={(e) => setText.short(e.target.value)}
        value={text.short}
      />
      <Button onClick={handleSave}>Short</Button>
    </HStack>
  );
}
