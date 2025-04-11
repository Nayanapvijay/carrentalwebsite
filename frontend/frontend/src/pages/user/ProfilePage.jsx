"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Camera } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Separator } from "../../components/ui/Seperator"
import { useAuth } from "../../hooks/useAuth"
import { useBookings } from "../../hooks/useBookings"
import BookingList from "../../components/bookings/BookingList"

const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth()
  const { bookings, loading: bookingsLoading, error: bookingsError } = useBookings()

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

  // Load user data
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
      })
    }
  }, [currentUser])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      const result = await updateProfile(profileData)

      if (result.success) {
        setSuccess("Profile updated successfully")
      } else {
        setError(result.error || "Failed to update profile")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.",err)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    try {
      setLoading(true)
      setPasswordError("")
      setPasswordSuccess("")

      // In a real app, this would call an API endpoint
      // await authService.changePassword(passwordData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setPasswordSuccess("Password changed successfully")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      setPasswordError("Failed to change password. Please check your current password and try again.",err)
    } finally {
      setLoading(false)
    }
  }

  return (
    
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account information and view your bookings</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Profile Card */}
          <Card className="h-fit p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold">
                  {currentUser?.firstName?.charAt(0) || ""}
                  {currentUser?.lastName?.charAt(0) || ""}
                </div>
                <button className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-white">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold">
                {currentUser?.firstName} {currentUser?.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{currentUser?.email}</p>

              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser?.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser?.address || "Not provided"}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="w-full text-sm">
                <p className="flex justify-between py-2">
                  <span className="text-muted-foreground">Member since</span>
                  <span>{new Date(currentUser?.createdAt || Date.now()).toLocaleDateString()}</span>
                </p>
                <p className="flex justify-between py-2">
                  <span className="text-muted-foreground">Total bookings</span>
                  <span>{bookings?.length || 0}</span>
                </p>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <div>
            <Tabs defaultValue="bookings">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="profile">Edit Profile</TabsTrigger>
                <TabsTrigger value="password">Change Password</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="mt-6">
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">My Bookings</h3>
                    <BookingList bookings={bookings} loading={bookingsLoading} error={bookingsError} />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

                    {error && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                      </div>
                    )}

                    {success && (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                      </div>
                    )}

                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          disabled
                        />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={profileData.phone} onChange={handleProfileChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={profileData.address} onChange={handleProfileChange} />
                      </div>

                      <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="password" className="mt-6">
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Change Password</h3>

                    {passwordError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {passwordError}
                      </div>
                    )}

                    {passwordSuccess && (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {passwordSuccess}
                      </div>
                    )}

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <Button type="submit" disabled={loading}>
                        {loading ? "Changing Password..." : "Change Password"}
                      </Button>
                    </form>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
   
  )
}

export default ProfilePage
