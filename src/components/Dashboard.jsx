import { useState } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, AlertCircle, CheckCircle2, Download } from 'lucide-react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import { jsPDF } from 'jspdf';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cropType, setCropType] = useState('General');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError('');
    }
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setResult(null);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('cropType', cropType);

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || t('dashboard.error_analyze'));
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;

    const doc = new jsPDF();
    
    // Add Logo or Title
    doc.setFontSize(22);
    doc.setTextColor(5, 150, 105); // emerald-600
    doc.text('CropGuard AI - Analysis Report', 20, 20);
    
    doc.setDrawColor(5, 150, 105);
    doc.line(20, 25, 190, 25);

    // Metadata
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Crop Type: ${cropType}`, 20, 42);

    // Analysis Result
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 55); // gray-800
    doc.text('Diagnostic Results', 20, 55);
    
    doc.setFontSize(14);
    doc.text(`Detected Disease: ${result.diseaseName}`, 20, 65);
    doc.text(`Confidence Score: ${(result.confidenceScore * 100).toFixed(1)}%`, 20, 75);

    // Treatment Plan
    doc.setFontSize(16);
    doc.text('Recommended Treatment', 20, 90);
    
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    const splitTreatment = doc.splitTextToSize(result.suggestedTreatment, 170);
    doc.text(splitTreatment, 20, 100);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Disclaimer: This is an AI-generated suggestion. For critical agricultural decisions, please consult a professional.', 20, 280);

    doc.save(`Crop_Report_${result.diseaseName.replace(/\s+/g, '_')}.pdf`);
  };

  const crops = [
    { value: 'General', label: 'General / Auto-Detect' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Corn', label: 'Corn' },
    { value: 'Tomato', label: 'Tomato' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl border-b-4 border-emerald-500 inline-block pb-2">
          {t('dashboard.title')}
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
        <div className="p-8">
          
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
             <label className="text-lg font-medium text-gray-700">{t('dashboard.select_crop')}</label>
             <select 
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="mt-1 block w-full md:w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md shadow-sm bg-gray-50 border"
             >
                {crops.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
             </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Upload Section */}
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <UploadCloud className="text-emerald-500" /> {t('dashboard.upload_title')}
              </h2>
              
              {!preview ? (
                <div className="flex-1 min-h-[300px] border-3 border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center p-6 bg-gray-50 hover:bg-emerald-50 transition-colors cursor-pointer group relative">
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  <ImageIcon className="mx-auto h-16 w-16 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                  <div className="mt-4 flex text-sm text-gray-600">
                      <span className="relative font-medium text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                        {t('dashboard.click_upload')}
                      </span>
                      <p className="pl-1">{t('dashboard.or_drag')}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{t('dashboard.formats')}</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl bg-gray-50 relative group">
                  <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-inner">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                  <div className="mt-4 w-full flex justify-between gap-4">
                     <button
                        onClick={clearSelection}
                        className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded shadow-sm transition-colors text-sm"
                     >
                       {t('dashboard.choose_another')}
                     </button>
                     <button
                        onClick={handleUpload}
                        disabled={isLoading}
                        className={`flex-1 flex justify-center items-center relative gap-2 font-medium py-2 px-4 border border-transparent rounded shadow-sm text-white text-sm transition-colors ${isLoading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                     >
                        {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> {t('dashboard.analyzing')}</> : t('dashboard.analyze')}
                     </button>
                  </div>
                </div>
              )}
            </div>

            {/* Result Section */}
            <div className="flex flex-col h-full bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-inner">
               <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">{t('dashboard.results')}</h2>
               
               {isLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                     <div className="relative w-20 h-20">
                       <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
                       <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                     </div>
                     <p className="text-lg font-medium text-emerald-700 animate-pulse">{t('dashboard.running_diagnostic')}</p>
                  </div>
               ) : error ? (
                  <div className="flex-1 flex flex-col items-center justify-center bg-red-50 p-6 rounded-lg text-center">
                     <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
                     <p className="text-red-700 font-medium">{error}</p>
                  </div>
               ) : result ? (
                  <div className="flex-1 flex flex-col space-y-6 animate-in zoom-in-95 duration-500">
                     <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{t('dashboard.diagnosis')}</h3>
                        <p className={`text-2xl font-bold ${result.diseaseName === 'Healthy' ? 'text-emerald-500' : 'text-orange-500'}`}>
                           {result.diseaseName}
                        </p>
                     </div>
                     
                     <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-sm font-medium text-gray-600">{t('dashboard.confidence')}</span>
                           <span className="text-sm font-bold text-emerald-600">{(result.confidenceScore * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                           <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${result.confidenceScore * 100}%` }}></div>
                        </div>
                     </div>

                     <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg p-5 flex-1 relative group">
                        <h3 className="text-sm font-semibold text-emerald-800 uppercase tracking-wide mb-2 flex flex-col h-full">{t('dashboard.treatment')}</h3>
                        <p className="text-emerald-900 leading-relaxed text-sm">
                           {result.suggestedTreatment}
                        </p>
                     </div>

                     <button
                        onClick={downloadReport}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold py-2 px-4 rounded-lg transition-colors border border-emerald-200"
                     >
                        <Download className="w-4 h-4" /> {t('dashboard.download_report')}
                     </button>
                  </div>
               ) : (
                  <div className="flex-1 flex items-center justify-center text-center px-6">
                     <p className="text-gray-400 text-sm">{t('dashboard.placeholder')}</p>
                  </div>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
