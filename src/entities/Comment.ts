import { Entity as TOEntity, Column, ManyToOne, BeforeInsert, JoinColumn, Index, OneToMany } from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { makeId } from "../util/helper"
import Post from './Post'
import User from './User'
import Entity from './Entity'
import Vote from './Vote';


@TOEntity('comments')
export default class Comment extends Entity {
    constructor(comment: Partial<Comment>) {
        super()
        Object.assign(this, comment)
    }

    @Index()
    @Column()
    identifier: string // 7 character Id

    @Column()
    body: string

    @Column()
    username: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
    post: Post

    @Exclude()
    @OneToMany(() => Vote, (vote) => vote.comment)
    votes: Vote[]

    @Expose() get voteScore(): number {
        return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0)
    }

    protected userVote: number
    setUserVote(user: User) {
        const index = this.votes?.findIndex((v) => v.username === user.username)
        this.userVote = index > -1 ? this.votes[index].value : 0
    }

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(8)

    }

}
