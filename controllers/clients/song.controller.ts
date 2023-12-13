import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

// [GET] /songs/:slugTopic
export const list =async (req: Request, res: Response) => {
    const topic = await Topic.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false
    });

    const songs = await Song.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    }).select("avatar title slug singerId like");

    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            status:"active",
            deleted:false
        });

        song["infoSinger"] = infoSinger;
    }

    res.render("clients/pages/songs/list", {
        pageTitle: topic.title,
        songs: songs
    });
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
    try {
        const slugSong: string = req.params.slugSong;
        const song = await Song.findOne({
            slug: slugSong,
            status: "active",
            deleted: false
        });

        if (!song) {
            // Handle the case where the song is not found
            return res.status(404).send("Song not found");
        }

        const singer = await Singer.findOne({
            _id: song.singerId,
            deleted: false
        }).select("fullName");

        const topic = await Topic.findOne({
            _id: song.topicId,
            deleted: false
        }).select("title");

        const favoriteSong = await FavoriteSong.findOne({
            songId: song.id
        });

        song["isFavoriteSong"] = favoriteSong ? true : false;

        res.render("clients/pages/songs/detail", {
            pageTitle: "Chi tiết bài hát",
            song: song,
            singer: singer,
            topic: topic
        });
    } catch (error) {
        // Handle other errors that might occur during the process
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// [PATCH] /songs/like/:typeLike/:idSong
export const like =async (req: Request, res: Response) => {
    const idSong: string = req.params.idSong;
    const typeLike: string = req.params.typeLike;

    const song = await Song.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });
    const newLike: number = typeLike == "like" ? song.like + 1 : song.like - 1;

    await Song.updateOne({
        _id: idSong 
    }, {
        like: newLike
    });
    // logic khi login bang user
    // like: ["id_user_1", "id_user_2"]

    res.json({
        code: 200,
        message: "Thành công!",
        like: newLike
    });
}

// [PATCH] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
    const idSong: string = req.params.idSong;
    const typeFavorite: string = req.params.typeFavorite;

    switch (typeFavorite) {
        case "favorite":
        const existFavoriteSong = await FavoriteSong.findOne({
            songId: idSong
        });
        if(!existFavoriteSong) {
        const record = new FavoriteSong({
            // userId: "",
            songId: idSong
        });
        await record.save();
        }
        break;
    case "unfavorite":
        await FavoriteSong.deleteOne({
        songId: idSong
        });
        break;
    default:
        break;
    }

    res.json({
        code: 200,
        message: "Thành công!"
    });
}


// [PATCH] /songs/listen/:idSong
export const listen =async (req: Request, res: Response) => {
    const idSong = req.params.idSong;

    const song = await Song.findOne({
        _id: idSong
    });

    const listen: number = song.listen + 1;

    await Song.updateOne({
        _id: idSong
    }, {
        listen: listen
    });

    const songNew = await Song.findOne({
        _id: idSong
    })
    res.json({
        code: 200,
        message: "Thành công!",
        listen: songNew.listen
    });
}