const https = require('https');
const { WebhookClient, EmbedBuilder } = require('discord.js');
const config = require('./settings/config.json');

// Import the webhook URL from the config file
const webhookClient = new WebhookClient({ url: config.url });

// Check the Discord status page for incidents
function checkStatus() {
    https.get('https://discordstatus.com/api/v2/incidents.json', (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const incidents = JSON.parse(data).incidents;
            if (incidents.length > 0) {
                const latestIncident = incidents[0];
                const updates = latestIncident.incident_updates.map(update => {
                    return {
                        name: `${update.status.charAt(0).toUpperCase() + update.status.slice(1)} (<t:${Math.floor(new Date(update.created_at).getTime() / 1000)}:R>)`,
                        value: update.body,
                        inline: false
                    };
                });
                const affectedComponents = latestIncident.components.map(component => component.name).join(', ');

                const embed = new EmbedBuilder()
                    .setTitle(`${latestIncident.name}`)
                    .setURL(latestIncident.shortlink)
                    .setColor(getStatusColor(latestIncident.status))
                    .setDescription(`• Impact: ${latestIncident.impact}\n• Affected Components: ${affectedComponents}`)
                    .addFields(...updates)
                    .setTimestamp(new Date(latestIncident.updated_at))
                    .setFooter({ text: `${latestIncident.id}` });
                webhookClient.send({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder()
                    .setTitle('No incidents reported')
                    .setColor('#06a51b')
                    .setDescription('There are currently no incidents reported on the Discord status page.');
                webhookClient.send({ embeds: [embed] });
            }
        });
    }).on('error', (err) => {
        console.error('Error fetching Discord status:', err);
    });
}

function getStatusColor(status) {
    switch (status) {
        case 'resolved': return '#4FE870';
        case 'monitoring': return '#32A2DA';
        case 'identified': return '#FC0341';
        default: return '#a50626';
    }
}

// Check status every 10 minutes
setInterval(checkStatus, 10 * 60 * 1000);

// Initial check
checkStatus();
console.log('Now checking for Discord status.');
