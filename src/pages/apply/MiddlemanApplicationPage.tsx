import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { useState } from "react";
import { IdDocumentUpload } from "@/components/auth/IdDocumentUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

const MiddlemanApplicationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get user info from location state
  const { name, email, password } = location.state || {};

  // Middleman-specific fields
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [expertise, setExpertise] = useState("");
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0]);
    }
  };
  const handleProofImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Validate required fields
    if (!idDocument || !expertise.trim() || !proofImage) {
      setIsLoading(false);
      return;
    }
    // Here you would send the application data to your backend
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/middleman");
    }, 1200);
  };

  return (
    <AuthLayout
      title="Middleman Application"
      subtitle="Apply to become a middleman by completing the form below."
      className="bg-gradient-to-r from-blue-50 to-indigo-50"
      showBackLink={true}
      backLinkUrl="/signup"
      backLinkText=""
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base">Full Name</Label>
          <Input value={name || ""} readOnly className="h-12 text-base px-4 bg-gray-100" />
        </div>
        <div className="space-y-3">
          <Label className="text-base">Email</Label>
          <Input value={email || ""} readOnly className="h-12 text-base px-4 bg-gray-100" />
        </div>
        <div className="space-y-3">
          <Label className="text-base">Password</Label>
          <div className="relative">
            <Input value={password || ""} readOnly type={showPassword ? "text" : "password"} className="h-12 text-base px-4 bg-gray-100 pr-12" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-4"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        <IdDocumentUpload idDocument={idDocument} onFileChange={handleFileChange} />
        <div className="space-y-3">
          <Label htmlFor="expertise" className="text-base">Expertise</Label>
          <Input id="expertise" placeholder="e.g. Electronics, Cars, Luxury Goods" value={expertise} onChange={e => setExpertise(e.target.value)} className="h-12 text-base px-4" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="proofImage" className="text-base">Proof of Expertise</Label>
          <div className="border border-input rounded-md p-4">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base"
                onClick={() => document.getElementById('proofImage')?.click()}
              >
                {proofImage ? 'Change File' : 'Upload File'}
              </Button>
              {proofImage && (
                <span className="text-sm text-gray-500 truncate max-w-[200px]">
                  {proofImage.name}
                </span>
              )}
            </div>
            <Input
              id="proofImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProofImageChange}
            />
            <p className="text-sm text-gray-500 mt-3">
              Please upload a file that proves your expertise (e.g., certificate, award, work sample)
            </p>
          </div>
        </div>
        <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit Application"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default MiddlemanApplicationPage; 