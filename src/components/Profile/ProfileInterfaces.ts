export interface ProfileResults {
    users: Users
    newUser: boolean
    upSubmitted: boolean
}
export interface Users {
        aboutMe: string,
        burnsAttended: number,
        favPrinciple: string,
        playaname: string,
        profilePic: string,
        status: string,
        userId: number
    
}