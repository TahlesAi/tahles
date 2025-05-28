
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Upload, 
  Image, 
  Video, 
  X, 
  Plus, 
  Star, 
  Building, 
  Newspaper,
  Award,
  Trash2
} from "lucide-react";

interface OnboardingProviderProfileProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  adminMode?: boolean;
}

const OnboardingProviderProfile = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack, 
  adminMode = false 
}: OnboardingProviderProfileProps) => {
  const [formData, setFormData] = useState({
    artistName: data.artistName || "",
    artistDescription: data.artistDescription || "",
    artistExperience: data.artistExperience || "",
    coverImage: data.coverImage || "",
    logo: data.logo || "",
    gallery: data.gallery || [],
    videos: data.videos || [],
    testimonials: data.testimonials || [],
    clientRecommendations: data.clientRecommendations || [],
    mediaLinks: data.mediaLinks || []
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File, type: 'logo' | 'cover' | 'gallery' | 'video') => {
    const mockUrl = `https://example.com/${type}/${file.name}`;
    
    switch (type) {
      case 'logo':
        handleInputChange('logo', mockUrl);
        break;
      case 'cover':
        handleInputChange('coverImage', mockUrl);
        break;
      case 'gallery':
        handleInputChange('gallery', [...formData.gallery, mockUrl]);
        break;
      case 'video':
        handleInputChange('videos', [...formData.videos, mockUrl]);
        break;
    }
    
    toast({
      title: "הקובץ הועלה בהצלחה",
      description: `${file.name} נוסף למדיה שלך`,
    });
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      text: "",
      author: "",
      rating: 5,
      company: "",
      position: ""
    };
    handleInputChange('testimonials', [...formData.testimonials, newTestimonial]);
  };

  const updateTestimonial = (index: number, field: string, value: any) => {
    const updated = formData.testimonials.map((testimonial, i) => 
      i === index ? { ...testimonial, [field]: value } : testimonial
    );
    handleInputChange('testimonials', updated);
  };

  const removeTestimonial = (index: number) => {
    const updated = formData.testimonials.filter((_, i) => i !== index);
    handleInputChange('testimonials', updated);
  };

  const addClientRecommendation = () => {
    const newRec = {
      id: Date.now().toString(),
      clientName: "",
      company: "",
      position: "",
      logoUrl: "",
      recommendation: ""
    };
    handleInputChange('clientRecommendations', [...formData.clientRecommendations, newRec]);
  };

  const updateClientRecommendation = (index: number, field: string, value: any) => {
    const updated = formData.clientRecommendations.map((rec, i) => 
      i === index ? { ...rec, [field]: value } : rec
    );
    handleInputChange('clientRecommendations', updated);
  };

  const removeClientRecommendation = (index: number) => {
    const updated = formData.clientRecommendations.filter((_, i) => i !== index);
    handleInputChange('clientRecommendations', updated);
  };

  const addMediaLink = () => {
    const newLink = {
      id: Date.now().toString(),
      title: "",
      url: "",
      source: "",
      date: ""
    };
    handleInputChange('mediaLinks', [...formData.mediaLinks, newLink]);
  };

  const updateMediaLink = (index: number, field: string, value: any) => {
    const updated = formData.mediaLinks.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    );
    handleInputChange('mediaLinks', updated);
  };

  const removeMediaLink = (index: number) => {
    const updated = formData.mediaLinks.filter((_, i) => i !== index);
    handleInputChange('mediaLinks', updated);
  };

  const handleNext = () => {
    if (!adminMode && !formData.artistName.trim()) {
      toast({
        title: "שגיאה",
        description: "יש למלא לפחות את שם האמן",
        variant: "destructive"
      });
      return;
    }
    
    onUpdate({ ...data, ...formData });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" dir="rtl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">פרופיל תדמיתי</h2>
        <p className="text-gray-600">בנה את הפרופיל התדמיתי שלך כדי להרשים לקוחות פוטנציאליים</p>
      </div>

      {/* פרטי אמן בסיסיים */}
      <Card>
        <CardHeader>
          <CardTitle>פרטי האמן</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="artistName">שם האמן/מופע</Label>
            <Input
              id="artistName"
              value={formData.artistName}
              onChange={(e) => handleInputChange('artistName', e.target.value)}
              placeholder="הזן שם אמן או מופע"
            />
          </div>
          
          <div>
            <Label htmlFor="artistDescription">תיאור תדמיתי</Label>
            <Textarea
              id="artistDescription"
              value={formData.artistDescription}
              onChange={(e) => handleInputChange('artistDescription', e.target.value)}
              placeholder="תאר את עצמך ואת הסגנון הייחודי שלך..."
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="artistExperience">ניסיון וידע מקצועי</Label>
            <Textarea
              id="artistExperience"
              value={formData.artistExperience}
              onChange={(e) => handleInputChange('artistExperience', e.target.value)}
              placeholder="תאר את הניסיון שלך, הכשרות, הישגים מיוחדים..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* מדיה ותמונות */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            מדיה ותמונות
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* לוגו */}
          <div>
            <Label>לוגו</Label>
            <div className="flex items-center gap-4 mt-2">
              {formData.logo ? (
                <div className="relative">
                  <img src={formData.logo} alt="לוגו" className="w-20 h-20 object-cover rounded-lg border" />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => handleInputChange('logo', "")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
              )}
              
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

          {/* תמונת כיסוי */}
          <div>
            <Label>תמונת כיסוי ראשית</Label>
            <div className="mt-2">
              {formData.coverImage ? (
                <div className="relative">
                  <img src={formData.coverImage} alt="כיסוי" className="w-full h-48 object-cover rounded-lg border" />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => handleInputChange('coverImage', "")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Upload className="h-12 w-12 text-gray-400" />
                </div>
              )}
              
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
                <Button variant="outline" className="mt-2" asChild>
                  <span>בחר תמונת כיסוי</span>
                </Button>
              </Label>
            </div>
          </div>

          {/* גלריה */}
          <div>
            <Label>גלריית תמונות</Label>
            {formData.gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {formData.gallery.map((img: string, index: number) => (
                  <div key={index} className="relative">
                    <img src={img} alt={`תמונה ${index + 1}`} className="w-full h-24 object-cover rounded-lg border" />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => {
                        const newGallery = formData.gallery.filter((_: any, i: number) => i !== index);
                        handleInputChange('gallery', newGallery);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
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
              <Button variant="outline" className="mt-2" asChild>
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  הוסף תמונה לגלריה
                </span>
              </Button>
            </Label>
          </div>

          {/* סרטונים */}
          <div>
            <Label>סרטונים</Label>
            {formData.videos.length > 0 && (
              <div className="space-y-2 mt-2">
                {formData.videos.map((video: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-gray-500" />
                      <span className="text-sm">סרטון {index + 1}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        const newVideos = formData.videos.filter((_: any, i: number) => i !== index);
                        handleInputChange('videos', newVideos);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
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
              <Button variant="outline" className="mt-2" asChild>
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  הוסף סרטון
                </span>
              </Button>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* המלצות לקוחות */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            המלצות לקוחות
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.testimonials.map((testimonial: any, index: number) => (
            <div key={testimonial.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">המלצה {index + 1}</h4>
                <Button size="sm" variant="destructive" onClick={() => removeTestimonial(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="שם הלקוח"
                  value={testimonial.author}
                  onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                />
                <Input
                  placeholder="חברה"
                  value={testimonial.company || ""}
                  onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                />
              </div>
              
              <Textarea
                placeholder="טקסט ההמלצה..."
                value={testimonial.text}
                onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                className="mt-4"
                rows={3}
              />
              
              <div className="flex items-center gap-2 mt-4">
                <Label>דירוג:</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 cursor-pointer ${
                        star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                      onClick={() => updateTestimonial(index, 'rating', star)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          <Button onClick={addTestimonial} variant="outline" className="w-full">
            <Plus className="h-4 w-4 ml-2" />
            הוסף המלצה
          </Button>
        </CardContent>
      </Card>

      {/* ממליצים עסקיים */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            ממליצים עסקיים
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.clientRecommendations.map((rec: any, index: number) => (
            <div key={rec.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">ממליץ {index + 1}</h4>
                <Button size="sm" variant="destructive" onClick={() => removeClientRecommendation(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="שם איש הקשר"
                  value={rec.clientName}
                  onChange={(e) => updateClientRecommendation(index, 'clientName', e.target.value)}
                />
                <Input
                  placeholder="שם החברה"
                  value={rec.company}
                  onChange={(e) => updateClientRecommendation(index, 'company', e.target.value)}
                />
                <Input
                  placeholder="תפקיד"
                  value={rec.position || ""}
                  onChange={(e) => updateClientRecommendation(index, 'position', e.target.value)}
                />
                <Input
                  placeholder="קישור ללוגו החברה"
                  value={rec.logoUrl || ""}
                  onChange={(e) => updateClientRecommendation(index, 'logoUrl', e.target.value)}
                />
              </div>
              
              <Textarea
                placeholder="טקסט ההמלצה..."
                value={rec.recommendation}
                onChange={(e) => updateClientRecommendation(index, 'recommendation', e.target.value)}
                className="mt-4"
                rows={3}
              />
            </div>
          ))}
          
          <Button onClick={addClientRecommendation} variant="outline" className="w-full">
            <Plus className="h-4 w-4 ml-2" />
            הוסף ממליץ עסקי
          </Button>
        </CardContent>
      </Card>

      {/* כתבו עלינו */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            כתבו עלינו במדיה
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.mediaLinks.map((link: any, index: number) => (
            <div key={link.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">כתבה {index + 1}</h4>
                <Button size="sm" variant="destructive" onClick={() => removeMediaLink(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="כותרת הכתבה"
                  value={link.title}
                  onChange={(e) => updateMediaLink(index, 'title', e.target.value)}
                />
                <Input
                  placeholder="מקור (עיתון/אתר)"
                  value={link.source}
                  onChange={(e) => updateMediaLink(index, 'source', e.target.value)}
                />
                <Input
                  placeholder="קישור לכתבה"
                  value={link.url}
                  onChange={(e) => updateMediaLink(index, 'url', e.target.value)}
                />
                <Input
                  placeholder="תאריך (אופציונלי)"
                  value={link.date || ""}
                  onChange={(e) => updateMediaLink(index, 'date', e.target.value)}
                />
              </div>
            </div>
          ))}
          
          <Button onClick={addMediaLink} variant="outline" className="w-full">
            <Plus className="h-4 w-4 ml-2" />
            הוסף כתבה
          </Button>
        </CardContent>
      </Card>

      {/* כפתורי ניווט */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          חזרה
        </Button>
        <Button onClick={handleNext}>
          המשך לשירותים
        </Button>
      </div>
    </div>
  );
};

export default OnboardingProviderProfile;
