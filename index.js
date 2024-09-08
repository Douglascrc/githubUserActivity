const axios = require('axios');

const [command, ...args] = process.argv.slice(2);

if (command === 'github-activity') {
    const username = args[0];
    if (!username) {
        console.error('Please provide a GitHub username.');
        process.exit(1);
    }

    const url = `https://api.github.com/users/${username}/events`;

    axios.get(url)
        .then(response => {
            const pushEvents = response.data.filter(push => push.type === 'PushEvent');
            pushEvents.forEach(push => {
                console.log('\n')
                console.log(`Repository: ${push.repo.name} \n`);
                push.payload.commits.forEach(commit => {
                    console.log(`commit message - ${commit.message}`);
                })
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
} else {
    console.error('Unknown command. Please use "github-activity <username>".');
}
