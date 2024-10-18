# Discord API Status Bot

This project is a Node.js application that monitors the status of the Discord API and reports any incidents to a specified Discord channel using a webhook.

## Features

- Fetches the latest incidents from the Discord status page.
- Sends detailed incident reports to a Discord channel.
- Automatically checks for new incidents every 10 minutes.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Illusion125/Discord-API-Status.git
    cd discord-api-status-bot
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Configure the webhook URL:
    - Create a `config.json` file in the `settings` directory with the following content:
        ```json
        {
            "url": "YOUR_DISCORD_WEBHOOK_URL"
        }
        ```

## Usage

To start the bot, run:
```bash
node index.js
```

The bot will start checking the Discord status page for incidents and report them to the specified Discord channel.

## Pages

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
