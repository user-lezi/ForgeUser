# ForgeUser

A lightweight ForgeScript extension that allows your Forge bot to interact with the Discord Gateway as a selfbot-style user client.
Useful for experimenting, learning, debugging, or doing cool automations…

> **⚠ Educational purposes ONLY.**

The developer of this package is NOT responsible for how you choose to use it.
If you misuse this, that’s on you, not me. 🙏
*Don't be weird.*

# Installation

Main branch: 
```js
npm i github:user-lezi/ForgeUser
```
Dev branch (latest updates!)
```js
npm i github:user-lezi/ForgeUser#dev
```

# Setup With Your ForgeClient

```js
import { ForgeUser } from "forge.user";
import { ForgeClient } from "@tryforge/forgescript";

const user = new ForgeUser({
  token: process.env.UserToken!,
  events: ["open", "close", "error", "messageCreate"],
});

const client = new ForgeClient({
  token: process.env.Token!,
  events: ["clientReady", "messageCreate"],
  extensions: [user],
  prefixes: ["~"],
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});

user.commands.add({
  type: "messageCreate",
  code: `$log[Received a message from @$username[$getUserMesssage[authorID]]]`
})

client.login();
```

# FAQs

## Q. Will I get banned?

- A: idk prob not 💀
People run user-side scripts all the time.
But Discord can take action if you abuse things.
Use your brain.
If you do get banned, tell me so I can update this answer 💀

## Q: How do I get my user token?

- A: Just google it 💀
I’m not writing a tutorial for that.

## Q: Why does this package exist?

- A: idk vro fr
I was bored and someone asked for it and now here we are.

## Q: Who made this & how do I get support?

If you get an error, either:

figure it out like a sigma dev 🧠 or
contact the developer:

- **[Lezi @ butwhylezi](https://discord.com/users/910837428862984213)** on Discord

> If I don’t respond I’m probably sleeping or ignoring you.

# License

MIT — do whatever you want, just don’t blame me if something breaks or if Discord bonks you.