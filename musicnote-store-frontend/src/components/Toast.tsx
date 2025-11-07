import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'fail' | 'error';
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {

    // 알림 메시지 자동으로 닫기
    useEffect(() => {
        const timer = setTimeout(() => {
          onClose();
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [onClose]);
      
      return (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
            <div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg ${
                    type === 'success'
                       ? 'bg-green-50 border border-green-200 text-green-800'
                       : type === 'error'
                       ? 'bg-red-50 border border-red-200 text-red-800'
                       : 'bg-yellow-50 border border-yellow-200 text-yellow-800'                       
                }`}>
                    {
                        type === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                        )
                    }

                    <span className="text-sm font-medium">{message}</span>

                    <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
                        <X className="w-4 h-4" />
                    </button>                  
            </div>
        </div>
      );
};