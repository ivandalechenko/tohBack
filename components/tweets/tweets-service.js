require('dotenv').config();
const axios = require('axios');
const tweetsModel = require('./tweets-model');
const now = require('../../utils/now');

const bearerToken = `AAAAAAAAAAAAAAAAAAAAAILWqgEAAAAA%2B1x%2Bv5J2iElOxm9Md4piNsWlTBY%3DVz0y4g0ZWMoCFucYDk1UtZL1KbEuOTqxSvmfje2tgrG0fz9cGR`;
class tweetsService {

    async get() {
        let tweets = await tweetsModel.findOne()

        if (!tweets) {
            tweets = await tweetsModel.create({ tweets: '', lastUpdate: now() })
        }

        try {

            if (tweets.lastUpdate < now() - 60 * 20) {
                // const data = getDataExample()
                const res = await axios.get("https://api.twitter.com/2/users/1859003083444961283/tweets", {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = res.data
                const posts = data.data
                let postIds = []
                for (let i = 0; i < posts.length; i++) {
                    postIds.push(posts[i].id)
                }
                // const postsRaw = getPostsExample()
                const postsRes = await axios.get(`https://api.twitter.com/2/tweets?ids=${postIds.join(',')}&tweet.fields=text,public_metrics&expansions=attachments.media_keys&media.fields=url`, {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                        'Content-Type': 'application/json'
                    }
                })
                const postsRaw = postsRes.data
                const postArr = transformPosts(postsRaw)
                tweets = await tweetsModel.findOneAndUpdate({}, { tweets: JSON.stringify(postArr), lastUpdate: now() }, { new: true })
            }

        } catch (error) {

        }

        return tweets;
    }
}

module.exports = new tweetsService();

const transformPosts = (data) => {
    const mediaMap = new Map();

    // Создаем мапу для быстрого доступа к media по media_key
    data.includes.media.forEach((media) => {
        mediaMap.set(media.media_key, media.url || null); // Устанавливаем null, если url отсутствует
    });

    // Преобразуем каждый пост
    const posts = data.data.map((post) => {
        const mediaKeys = post.attachments?.media_keys || [];
        const firstMediaKey = mediaKeys.length > 0 ? mediaKeys[0] : null;

        return {
            text: post.text,
            media: firstMediaKey ? mediaMap.get(firstMediaKey) : null, // Берем URL по ключу
            public_metrics: post.public_metrics,
        };
    });

    return posts;
};


const getPostsExample = (data) => {
    return {
        "data": [
            {
                "attachments": {
                    "media_keys": [
                        "3_1872782276309749760"
                    ]
                },
                "edit_history_tweet_ids": [
                    "1872782662353732009"
                ],
                "text": "$TOH  HOT PAIR ON DEXTOOLS 🔥\n\nDEX: \nhttps://t.co/7BGSFv5TGm https://t.co/QwGpjKPly7",
                "id": "1872782662353732009",
                "public_metrics": {
                    "retweet_count": 0,
                    "reply_count": 8,
                    "like_count": 8,
                    "quote_count": 0,
                    "bookmark_count": 0,
                    "impression_count": 637
                }
            },
            {
                "attachments": {
                    "media_keys": [
                        "3_1869804872880521216"
                    ]
                },
                "edit_history_tweet_ids": [
                    "1869804874965364949"
                ],
                "text": "$TOH - 500K MCAP \n#solana  #teddyonheels  #memecoin  #TOH  #ToTheMoon https://t.co/99JmnsgyOm",
                "id": "1869804874965364949",
                "public_metrics": {
                    "retweet_count": 2,
                    "reply_count": 4,
                    "like_count": 11,
                    "quote_count": 0,
                    "bookmark_count": 0,
                    "impression_count": 875
                }
            },
            {
                "attachments": {
                    "media_keys": [
                        "3_1869646943409815552"
                    ]
                },
                "edit_history_tweet_ids": [
                    "1869646948732748266"
                ],
                "text": "Soon, we’ll see the first heel prints on the moon! 👀\n$TOH https://t.co/vbHJG9t8pw",
                "id": "1869646948732748266",
                "public_metrics": {
                    "retweet_count": 1,
                    "reply_count": 7,
                    "like_count": 11,
                    "quote_count": 0,
                    "bookmark_count": 0,
                    "impression_count": 762
                }
            },
            {
                "attachments": {
                    "media_keys": [
                        "3_1869283110849855488"
                    ]
                },
                "edit_history_tweet_ids": [
                    "1869280556220858686",
                    "1869283152495030601"
                ],
                "text": "Important Notice $TOH\nPlease note that these are the ONLY official links related to this project.\n Do NOT interact with any other links !\nAdditionally, double-check the contract address before making any transactions to ensure you're using the correct one.\nStay safe and vigilant!… https://t.co/1WLVAq3rSn https://t.co/AwhgihS1ls",
                "id": "1869283152495030601",
                "public_metrics": {
                    "retweet_count": 2,
                    "reply_count": 7,
                    "like_count": 13,
                    "quote_count": 0,
                    "bookmark_count": 1,
                    "impression_count": 472
                }
            },
            {
                "attachments": {
                    "media_keys": [
                        "3_1866402803167494144"
                    ]
                },
                "edit_history_tweet_ids": [
                    "1866404165196431733"
                ],
                "text": "$TOH GROK ! 🙌\nGROK thinks TOH = 🦁 https://t.co/jVHJHIsfCN https://t.co/kSSs2SgPMD",
                "id": "1866404165196431733",
                "public_metrics": {
                    "retweet_count": 1,
                    "reply_count": 17,
                    "like_count": 20,
                    "quote_count": 0,
                    "bookmark_count": 0,
                    "impression_count": 671
                }
            },
            {
                "attachments": {
                    "media_keys": [
                        "3_1866121282904825857"
                    ]
                },
                "edit_history_tweet_ids": [
                    "1866121286352777572"
                ],
                "text": "$TOH 🦁 Live on 👀\n@CoinMarketCap #CMC \nhttps://t.co/FM1q82rnnY\n@coingecko \nhttps://t.co/P85BnbOPiv\n\nC1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB https://t.co/2SRk9G5GGF",
                "id": "1866121286352777572",
                "public_metrics": {
                    "retweet_count": 2,
                    "reply_count": 15,
                    "like_count": 24,
                    "quote_count": 0,
                    "bookmark_count": 0,
                    "impression_count": 572
                }
            },
            {
                "attachments": {
                    "media_keys": [
                        "7_1863376524612603904"
                    ]
                },
                "edit_history_tweet_ids": [
                    "1863376658469925011",
                    "1863378487907614921"
                ],
                "text": "$\nThe\nOpportunity\nHustlers\n\nC1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB\n\nhttps://t.co/Z0GFqieeaF\nhttps://t.co/P85BnbOhsX\n\n5M $TOH BURN 🔥🔥🔥\nhttps://t.co/iIf53A1S8z https://t.co/S2x84Yuao7 https://t.co/kjh9F0CS0H",
                "id": "1863378487907614921",
                "public_metrics": {
                    "retweet_count": 4,
                    "reply_count": 13,
                    "like_count": 21,
                    "quote_count": 1,
                    "bookmark_count": 0,
                    "impression_count": 874
                }
            },
            {
                "attachments": {
                    "media_keys": [
                        "3_1863067985528619008"
                    ]
                },
                "edit_history_tweet_ids": [
                    "1863072410221609213"
                ],
                "text": "TEDDY 🦁 ROUTINE  \n\nHeels up ! TheOpulenceHunters 💎 \n5M $TOH BURNED 🔥🔥🔥\n\nhttps://t.co/wolcejaaLe https://t.co/oZArF9CvFW https://t.co/gHAyH9r3qB",
                "id": "1863072410221609213",
                "public_metrics": {
                    "retweet_count": 2,
                    "reply_count": 25,
                    "like_count": 29,
                    "quote_count": 0,
                    "bookmark_count": 0,
                    "impression_count": 711
                }
            },
            {
                "attachments": {
                    "media_keys": [
                        "3_1862705841045991424"
                    ]
                },
                "edit_history_tweet_ids": [
                    "1862707153955377279"
                ],
                "text": "HEELS UP !!! for TheOpulenceHunters 🦁!\n\nANOTHER 5M $TOH BURNED ✅\n\nhttps://t.co/Lq0YZNLvpe https://t.co/IMDNqxy94s https://t.co/AGcJCrxiDN",
                "id": "1862707153955377279",
                "public_metrics": {
                    "retweet_count": 4,
                    "reply_count": 63,
                    "like_count": 56,
                    "quote_count": 0,
                    "bookmark_count": 0,
                    "impression_count": 2464
                }
            }
        ],
        "includes": {
            "media": [
                {
                    "media_key": "3_1872782276309749760",
                    "type": "photo",
                    "url": "https://pbs.twimg.com/media/Gf11jtEXEAAwU0q.jpg"
                },
                {
                    "media_key": "3_1869804872880521216",
                    "type": "photo",
                    "url": "https://pbs.twimg.com/media/GfLhoA9WgAAMSud.jpg"
                },
                {
                    "media_key": "3_1869646943409815552",
                    "type": "photo",
                    "url": "https://pbs.twimg.com/media/GfJR_T1WQAAk1q7.jpg"
                },
                {
                    "media_key": "3_1869283110849855488",
                    "type": "photo",
                    "url": "https://pbs.twimg.com/media/GfEHFd7XwAA6rBR.jpg"
                },
                {
                    "media_key": "3_1866402803167494144",
                    "type": "photo",
                    "url": "https://pbs.twimg.com/media/GebLdfqXgAA96oZ.jpg"
                },
                {
                    "media_key": "3_1866121282904825857",
                    "type": "photo",
                    "url": "https://pbs.twimg.com/media/GeXLa29WoAEYt_r.jpg"
                },
                {
                    "media_key": "7_1863376524612603904",
                    "type": "video"
                },
                {
                    "media_key": "3_1863067985528619008",
                    "type": "photo",
                    "url": "https://pbs.twimg.com/media/Gdrydj3WAAAkv4d.jpg"
                },
                {
                    "media_key": "3_1862705841045991424",
                    "type": "photo",
                    "url": "https://pbs.twimg.com/media/GdmpF-iXcAAS1pS.jpg"
                }
            ]
        }
    }
}




const getDataExample = () => {
    return {
        "data": [
            {
                "edit_history_tweet_ids": [
                    "1872782662353732009"
                ],
                "id": "1872782662353732009",
                "text": "$TOH  HOT PAIR ON DEXTOOLS 🔥\n\nDEX: \nhttps://t.co/7BGSFv5TGm https://t.co/QwGpjKPly7"
            },
            {
                "edit_history_tweet_ids": [
                    "1869804874965364949"
                ],
                "id": "1869804874965364949",
                "text": "$TOH - 500K MCAP \n#solana  #teddyonheels  #memecoin  #TOH  #ToTheMoon https://t.co/99JmnsgyOm"
            },
            {
                "edit_history_tweet_ids": [
                    "1869646948732748266"
                ],
                "id": "1869646948732748266",
                "text": "Soon, we’ll see the first heel prints on the moon! 👀\n$TOH https://t.co/vbHJG9t8pw"
            },
            {
                "edit_history_tweet_ids": [
                    "1869280556220858686",
                    "1869283152495030601"
                ],
                "id": "1869283152495030601",
                "text": "Important Notice $TOH\nPlease note that these are the ONLY official links related to this project.\n Do NOT interact with any other links !\nAdditionally, double-check the contract address before making any transactions to ensure you're using the correct one.\nStay safe and vigilant!… https://t.co/1WLVAq3rSn https://t.co/AwhgihS1ls"
            },
            {
                "edit_history_tweet_ids": [
                    "1866404165196431733"
                ],
                "id": "1866404165196431733",
                "text": "$TOH GROK ! 🙌\nGROK thinks TOH = 🦁 https://t.co/jVHJHIsfCN https://t.co/kSSs2SgPMD"
            },
            {
                "edit_history_tweet_ids": [
                    "1866121286352777572"
                ],
                "id": "1866121286352777572",
                "text": "$TOH 🦁 Live on 👀\n@CoinMarketCap #CMC \nhttps://t.co/FM1q82rnnY\n@coingecko \nhttps://t.co/P85BnbOPiv\n\nC1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB https://t.co/2SRk9G5GGF"
            },
            {
                "edit_history_tweet_ids": [
                    "1863376658469925011",
                    "1863378487907614921"
                ],
                "id": "1863378487907614921",
                "text": "$\nThe\nOpportunity\nHustlers\n\nC1u7A1zBp2ck9ui89dVD6VC4FmXNe2C2HK9mPdkVHUSB\n\nhttps://t.co/Z0GFqieeaF\nhttps://t.co/P85BnbOhsX\n\n5M $TOH BURN 🔥🔥🔥\nhttps://t.co/iIf53A1S8z https://t.co/S2x84Yuao7 https://t.co/kjh9F0CS0H"
            },
            {
                "edit_history_tweet_ids": [
                    "1863072410221609213"
                ],
                "id": "1863072410221609213",
                "text": "TEDDY 🦁 ROUTINE  \n\nHeels up ! TheOpulenceHunters 💎 \n5M $TOH BURNED 🔥🔥🔥\n\nhttps://t.co/wolcejaaLe https://t.co/oZArF9CvFW https://t.co/gHAyH9r3qB"
            },
            {
                "edit_history_tweet_ids": [
                    "1862707153955377279"
                ],
                "id": "1862707153955377279",
                "text": "HEELS UP !!! for TheOpulenceHunters 🦁!\n\nANOTHER 5M $TOH BURNED ✅\n\nhttps://t.co/Lq0YZNLvpe https://t.co/IMDNqxy94s https://t.co/AGcJCrxiDN"
            }
        ],
        "meta": {
            "result_count": 9,
            "newest_id": "1872782662353732009",
            "oldest_id": "1862707153955377279",
            "next_token": "7140dibdnow9c7btw4b2e9iu0s8rnhqwt2uspegyizz95"
        }
    }



}