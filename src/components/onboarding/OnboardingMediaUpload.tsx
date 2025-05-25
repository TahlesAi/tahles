
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Image, Video, X, Plus } from "lucide-react";

interface OnboardingMediaUploadProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  adminMode?: boolean;
}

const OnboardingMediaUpload = ({ data, onUpdate, onNext, onBack, adminMode = false }: OnboardingMediaUploadProps) => {
  const [logoPreview, setLogoPreview] = useState(data.logo || "");
  const [coverImagePreview, setCoverImagePreview] = useState(data.coverImage || "");
  const [galleryPreviews, setGalleryPreviews] = useState(data.gallery || []);
  const [videoPreviews, setVideoPreviews] = useState(data.videos || []);
  const { toast } = useToast();

  const handleFileUpload = (file: File, type: 'logo' | 'cover' | 'gallery' | 'video') => {
    // סימולציה של העלאת קובץ - במציאות יהיה צורך בהעלאה לשרת
    const mockUrl = `https://example.com/${type}/${file.name}`;
    
    switch (type) {
      case 'logo':
        setLogoPreview(mockUrl);
        onUpdate({ ...data, logo: mockUrl });
        break;
      case 'cover':
        setCoverImagePreview(mockUrl);
        onUpdate({ ...data, coverImage: mockUrl });
        break;
      case 'gallery':
        const newGallery = [...galleryPreviews, mockUrl];
        setGalleryPreviews(newGallery);
        onUpdate({ ...data, gallery: newGallery });
        break;
      case 'video':
        const newVideos = [...videoPreviews, mockUrl];
        setVideoPreviews(newVideos);
        onUpdate({ ...data, videos: newVideos });
        break;
    }
    
    toast({
      title: "הקובץ הועלה בהצלחה",
      description: `${file.name} נוסף למדיה שלך`,
    });
  };

  const removeFromGallery = (index: number) => {
    const newGallery = galleryPreviews.filter((_, i) => i !== index);
    setGalleryPreviews(newGallery);
    onUpdate({ ...data, gallery: newGallery });
  };

  const removeVideo = (index: number) => {
    const newVideos = videoPreviews.filter((_, i) => i !== index);
    setVideoPreviews(newVideos);
    onUpdate({ ...data, videos: newVideos });
  };

  const handleNext = () => {
    if (!adminMode && !logoPreview && !coverImagePreview) {
      toast({
        title: "שגיאה",
        description: "יש להעלות לפחות לוגו או תמונת רקע",
        variant: "destructive"
      });
      return;
    }
    
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" dir="rtl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">העלאת מדיה</h2>
        <p className="text-gray-600">הוסף תמונות וסרטונים לפרופיל הספק שלך</p>
      </div>

      {/* לוגו */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            לוגו עסק
          </CardTitle>
          <CardDescription>
            לוגו שיוצג בפרופיל שלך ובכרטיסי השירותים
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {logoPreview ? (
              <div className="relative">
                <img 
                  src={logoPreview} 
                  alt="לוגו" 
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => {
                    setLogoPreview("");
                    onUpdate({ ...data, logo: "" });
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
            )}
            
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'logo');
                }}
                className="hidden"
                id="logo-upload"
              />
              <Label htmlFor="logo-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>בחר לוגו</span>
                </Button>
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* תמונת רקע */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            תמונת רקע ראשית
          </CardTitle>
          <CardDescription>
            תמונה ראשית שתוצג בחלק העליון של הפרופיל
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coverImagePreview ? (
              <div className="relative">
                <img 
                  src={coverImagePreview} 
                  alt="תמונת רקע" 
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setCoverImagePreview("");
                    onUpdate({ ...data, coverImage: "" });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">העלה תמונת רקע</p>
                </div>
              </div>
            )}
            
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'cover');
                }}
                className="hidden"
                id="cover-upload"
              />
              <Label htmlFor="cover-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>בחר תמונת רקע</span>
                </Button>
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* גלריית תמונות */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            גלריית תמונות
          </CardTitle>
          <CardDescription>
            תמונות נוספות שיוצגו בגלריה (עד 10 תמונות)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryPreviews.map((img, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={img} 
                      alt={`תמונה ${index + 1}`} 
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => removeFromGallery(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {galleryPreviews.length < 10 && (
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'gallery');
                  }}
                  className="hidden"
                  id="gallery-upload"
                />
                <Label htmlFor="gallery-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      הוסף תמונה לגלריה
                    </span>
                  </Button>
                </Label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* סרטונים */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            סרטונים
          </CardTitle>
          <CardDescription>
            סרטונים שיוצגו בפרופיל (עד 5 סרטונים)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {videoPreviews.length > 0 && (
              <div className="space-y-2">
                {videoPreviews.map((video, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-gray-500" />
                      <span className="text-sm">סרטון {index + 1}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeVideo(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {videoPreviews.length < 5 && (
              <div>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'video');
                  }}
                  className="hidden"
                  id="video-upload"
                />
                <Label htmlFor="video-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      הוסף סרטון
                    </span>
                  </Button>
                </Label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* כפתורי ניווט */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          חזרה
        </Button>
        <Button onClick={handleNext}>
          המשך לחתימה דיגיטלית
        </Button>
      </div>
    </div>
  );
};

export default OnboardingMediaUpload;
