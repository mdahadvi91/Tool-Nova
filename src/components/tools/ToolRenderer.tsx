import React from 'react';
import { ToolDefinition } from '../../registry/types';
import { QrBarcodeStudio } from '../../tools/qr/QrBarcodeStudio';
import { VisitingCardBuilder } from '../../tools/card/VisitingCardBuilder';
import { ImageEditorStudio } from '../../tools/image/ImageEditorStudio';
import { UniversalImageConverter } from '../../tools/image/UniversalImageConverter';
import { PdfToolkit } from '../../tools/pdf/PdfToolkit';
import { LoanEmiCalculator } from '../../tools/finance/LoanEmiCalculator';
import { UaeToolsStudio } from '../../tools/uae/UaeToolsStudio';
import { JsonStudio } from '../../tools/dev/JsonStudio';
import { SecurityHashStudio } from '../../tools/security/SecurityHashStudio';
import { RegexStudio } from '../../tools/regex/RegexStudio';
import { ColorStudio } from '../../tools/color/ColorStudio';
import { TextMetricsStudio } from '../../tools/text/TextMetricsStudio';
import { UnitConverterStudio } from '../../tools/unit/UnitConverterStudio';

interface ToolRendererProps {
  tool: ToolDefinition;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool }) => {
  switch (tool.id) {
    case 'qr-barcode-studio':
      return <QrBarcodeStudio initialMode="qr" />;
    case 'photo-qr-badge':
      return <QrBarcodeStudio initialMode="photo-badge" />;
    case 'wifi-qr-gen':
      return <QrBarcodeStudio initialMode="qr" />;
    case 'vcard-qr-gen':
      return <QrBarcodeStudio initialMode="qr" />;
    case 'visiting-card-builder':
      return <VisitingCardBuilder />;
    case 'image-editor-studio':
      return <ImageEditorStudio />;
    case 'universal-image-converter':
      return <UniversalImageConverter />;
    case 'pdf-toolkit':
      return <PdfToolkit />;
    case 'loan-emi-calculator':
      return <LoanEmiCalculator />;
    case 'uae-gratuity-calculator':
      return <UaeToolsStudio defaultTab="gratuity" />;
    case 'uae-vat-calculator':
      return <UaeToolsStudio defaultTab="vat" />;
    case 'json-studio':
      return <JsonStudio />;
    case 'security-hash-studio':
      return <SecurityHashStudio />;
    case 'regex-studio':
      return <RegexStudio />;
    case 'color-studio':
      return <ColorStudio />;
    case 'text-metrics-analyzer':
      return <TextMetricsStudio />;
    case 'universal-unit-converter':
      return <UnitConverterStudio />;
    default:
      return (
        <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center">
          <p className="text-slate-300 mb-2 font-medium">{tool.name}</p>
          <p className="text-xs text-slate-500">{tool.shortDescription}</p>
        </div>
      );
  }
};
